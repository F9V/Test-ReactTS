const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001; // Puoi scegliere qualsiasi porta disponibile

// Abilita il CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Imposta il dominio del tuo front-end
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// Gestisci richieste GET per la traduzione
app.get('/translate', async (req, res) => {
  const { text, source_lang, target_lang } = req.query;

  try {
    const response = await axios.post(
      'https://api-free.deepl.com/v2/translate',
      {
        text,
        source_lang,
        target_lang,
      },
      {
        headers: {
          'Authorization': 'DeepL-Auth-Key [b53bc108-48aa-37e9-e4f9-6ee098265447:fx]',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Errore durante la traduzione' });
  }
});

app.listen(port, () => {
  console.log(`Server proxy in esecuzione sulla porta ${port}`);
});
