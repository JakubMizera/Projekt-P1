import express, { Request, Response } from 'express';
import Contact from '../models/Contact'; 

const router = express.Router();


router.get('/', async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find(); 
    res.json(contacts); 
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message }); 
    } else {
      res.status(500).json({ message: "An unknown error occurred" }); 
    }
  }
});
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error: unknown) { 
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});
router.post('/', async (req: Request, res: Response) => {
  try {
    const newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    });
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});
  router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(updatedContact);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

export default router;
