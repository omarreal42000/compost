import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Body parser for JSON with support for base64 images
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Initialize GoogleGenAI SDK
const getGenAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY no está configurada en las variables de entorno.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API: Image Understanding & Analysis using gemini-3.1-pro-preview
app.post('/api/analyze-image', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', prompt = 'Analiza esta imagen detalladamente en el contexto de lombricultura y el centro universitario.' } = req.body;
    
    if (!imageBase64) {
      return res.status(400).json({ error: 'Se requiere imageBase64 para el análisis.' });
    }

    const ai = getGenAIClient();
    
    // Clean base64 string if it contains data URI prefix
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    const imagePart = {
      inlineData: {
        mimeType,
        data: cleanBase64,
      },
    };

    const textPart = {
      text: `${prompt}\n\nPor favor estructura tu respuesta en:\n1. Descripción visual y elementos identificados (materiales, canteros, medidas, cubiertas, vegetación).\n2. Evaluación técnica para Lombriz Roja Californiana (Eisenia foetida): humedad, sombreado, aireación y protección.\n3. Diagnóstico territorial o recomendaciones de optimización estructural.`,
    };

    let resultText = '';
    try {
      // First try gemini-3.1-pro-preview as specified
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: { parts: [imagePart, textPart] },
      });
      resultText = response.text || '';
    } catch (primaryErr: any) {
      console.warn('Fallback a gemini-3.8-flash tras error con 3.1-pro-preview:', primaryErr?.message);
      // Fallback to gemini-3.8-flash if quota/access fails
      const fallbackResponse = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: { parts: [imagePart, textPart] },
      });
      resultText = fallbackResponse.text || '';
    }

    return res.json({ analysis: resultText, success: true });
  } catch (error: any) {
    console.error('Error en /api/analyze-image:', error);
    return res.status(500).json({ 
      error: error?.message || 'Error al analizar la imagen',
      details: error?.status || 'INTERNAL_ERROR'
    });
  }
});

// API: Generate high-quality image with custom aspect ratio & size
app.post('/api/generate-image', async (req, res) => {
  try {
    const { 
      prompt, 
      aspectRatio = '16:9', 
      imageSize = '1K',
      useStudioQuality = true
    } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Se requiere el parámetro prompt.' });
    }

    const ai = getGenAIClient();
    const modelToUse = useStudioQuality ? 'gemini-3-pro-image-preview' : 'gemini-3.1-flash-image-preview';

    const validAspectRatios = ['1:1', '2:3', '3:2', '3:4', '4:3', '9:16', '16:9', '21:9'];
    const validSizes = ['1K', '2K', '4K'];

    const chosenAspectRatio = validAspectRatios.includes(aspectRatio) ? aspectRatio : '16:9';
    const chosenSize = validSizes.includes(imageSize) ? imageSize : '1K';

    const response = await ai.models.generateContent({
      model: modelToUse,
      contents: {
        parts: [
          { text: prompt },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: chosenAspectRatio as any,
          imageSize: chosenSize as any,
        },
      },
    });

    let generatedImageUrl: string | null = null;
    let textResponse = '';

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData?.data) {
          const mime = part.inlineData.mimeType || 'image/png';
          generatedImageUrl = `data:${mime};base64,${part.inlineData.data}`;
          break;
        } else if (part.text) {
          textResponse += part.text;
        }
      }
    }

    if (!generatedImageUrl) {
      return res.status(422).json({
        error: 'No se generó ninguna imagen en la respuesta del modelo.',
        textResponse,
      });
    }

    return res.json({
      imageUrl: generatedImageUrl,
      aspectRatio: chosenAspectRatio,
      imageSize: chosenSize,
      success: true,
    });
  } catch (error: any) {
    console.error('Error en /api/generate-image:', error);
    return res.status(500).json({
      error: error?.message || 'Error al generar la imagen',
      isQuotaError: error?.message?.includes('quota') || error?.message?.includes('RESOURCE_EXHAUSTED'),
    });
  }
});

// API: Coordinates and Environmental Analysis for Zapopan (20.7436, -103.3767)
app.get('/api/site-analysis', (req, res) => {
  const analysisData = {
    coordinates: {
      lat: 20.7436,
      lng: -103.3767,
      formatted: '20°44\'37.0"N 103°22\'36.1"W',
      municipality: 'Zapopan, Jalisco, México',
      zone: 'Campus Universitario / Reserva Los Belenes - UdeG',
      accessRoad: 'Prolongación José Parres Arias',
    },
    climaticProfile: {
      classification: 'Templado subhúmedo (Cwb) con estación seca marcada',
      averageTempAnnual: '21.5 °C',
      tempRangeVermiculture: 'Óptima para Eisenia foetida (18°C - 26°C)',
      summerPeakTemp: '32°C (Requiere malla sombra 80% y microaspersión activa en mayo)',
      winterMinTemp: '7°C (La masa del cantero de 10x1m retiene calor orgánico interno)',
      rainySeason: 'Junio a Octubre (Promedio anual ~900mm - Obligatorio techo de plástico para evitar anegamiento y lixiviación descontrolada)',
    },
    topographyAndZoning: {
      elevation: '1,565 msnm',
      structuresIdentified: [
        {
          name: 'Módulo de círculos concéntricos',
          description: '3 a 4 estructuras circulares en el centro del claro (antiguos tanques piscícolas/acuaponía, canteros circulares o biodigestores experimentales).',
          recommendation: 'Excelente punto ancla: área circundante plana, nivelada y accesible mediante senderos de tierra compactada.',
        },
        {
          name: 'Nave / Invernadero con techumbre semicircular',
          description: 'Ubicado al suroeste con tejado curvado y anexo rojo. Suministro de agua de riego y energía a menos de 45 metros.',
          recommendation: 'Fuente directa de conexión hidráulica para la microaspersión y almacenamiento de herramientas / residuos verdes.',
        },
        {
          name: 'Canteros proyectados (6m x 1m y 10m x 1m)',
          description: 'Disposición lineal paralela con orientación Norte-Sur para reducir radiación directa en los costados.',
          dimensions: 'Cantero A: 6.0m x 1.0m x 0.7m. Cantero B (Nuevo): 10.0m x 1.0m x 0.7m.',
        },
      ],
      biologicalSpecs: {
        species: 'Lombriz Roja Californiana (Eisenia foetida)',
        densityTarget: '1 a 3 kg de lombriz por metro lineal de cantero',
        substrateHeight: '40 a 60 cm de material orgánico semicompuesto',
        moistureTarget: '75% a 80% (prueba de puño: humedece sin gotear en exceso)',
        lixiviateDrainage: 'Pendiente del 1.5% hacia canaleta colectora de humus líquido',
      },
    },
  };

  res.json(analysisData);
});

// Configure Vite or Static Serve
async function setupServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor de Vermicomposta activo en http://0.0.0.0:${port}`);
  });
}

setupServer().catch((err) => {
  console.error('Error al iniciar el servidor:', err);
});
