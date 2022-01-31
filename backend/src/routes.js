const router = require('express').Router();
const Manga = require('./models/Manga');

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

router.post('/manga', async (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: 'Por favor, preencha os campos!' });
    return;
  }

  const { name, image_url, price } = req.body;

  const manga = {
    name,
    image_url,
    price,
  };

  try {
    await Manga.create(manga);

    res.status(201).json({ message: 'Mangá cadastrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get('/mangas', async (req, res) => {
  try {
    const mangas = await Manga.find();

    res.status(200).json(mangas);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get('/mangas/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const manga = await Manga.findOne({ _id: id });

    if (!manga) {
      res.status(404).json({ error: 'Mangá não encontrado!' });
      return;
    }

    res.status(200).json(manga);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.patch('/mangas/:id', async (req, res) => {
  const { id } = req.params;

  const { name, image_url, price } = req.body;

  const manga = {
    name,
    image_url,
    price,
  };

  try {
    const updatedManga = await Manga.updateOne({ _id: id }, manga);

    if (updatedManga.matchedCount === 0) {
      res.status(404).json({ error: 'Mangá não encontrado!' });
    }

    res.status(200).json(manga);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete('/mangas/:id', async (req, res) => {
  const { id } = req.params;

  const manga = await Manga.findOne({ _id: id });

  if (!manga) {
    res.status(404).json({ error: 'Mangá não encontrado!' });
    return;
  }

  try {
    await Manga.deleteOne({ _id: id });

    res.status(200).json({ message: 'Mangá deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
