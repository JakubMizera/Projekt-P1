import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import { CourseCategory } from '../interfaces/CourseCategory';



// Walidacja użytkownika
exports.validateUser = [
  check('firstName').not().isEmpty().withMessage('Imię jest wymagane'),
  check('lastName').not().isEmpty().withMessage('Nazwisko jest wymagane')
  .matches(/^[a-zA-Z0-9ąęłńóśżźĄĘŁŃÓŚŻŹ\s]+$/)

];

// Walidacja kursu
exports.validateCourse = [
  //Tytył kursu
  check('title').not().isEmpty().withMessage('Tytuł jest wymagany')
  .isLength({ max: 100 })
  .withMessage('Tytuł kursu może zawierać maksymalnie 100 znaków.')
  .matches(/^[a-zA-Z0-9ąęłńóśżźĄĘŁŃÓŚŻŹ\s]+$/)
  .withMessage('Tytuł kursu może zawierać tylko litery, cyfry i spacje.')
  ,

  //Opis kursu
  check('description').not().isEmpty().withMessage('Opis jest wymagany')
  .isLength({ max: 1000 })
  .matches(/^[a-zA-Z0-9ąęłńóśżźĄĘŁŃÓŚŻŹ\s]+$/),


  //Cena kursu
  check('price').not().isEmpty().withMessage('Cena jest wymagana')
   .isFloat({ gt: 0 }).withMessage('Cena musi być większa niż 0')
   .isFloat({ max: 99999.99 }).withMessage('Cena nie może przekraczać 99999.99')
   .matches(/^\d+(\.\d{1,2})?$/).withMessage('Cena musi być zaokrąglona do maksymalnie dwóch miejsc po przecinku'),


  //Numer konta
  // check('accountNumber')
  //   .isLength({ min: 26, max: 26 })
  //   .withMessage('Numer konta musi zawierać dokładnie 26 znaków.')
  //   .matches(/^[0-9]+$/)
  //   .withMessage('Numer konta może zawierać tylko cyfry.')
];

export const validateContact = [
  // Walidacja nazwy
  check('name')
    .trim()
    .not().isEmpty().withMessage('Pole imię i nazwisko jest wymagane.')
    .isLength({ min: 2, max: 50 }).withMessage('Imię i nazwisko musi zawierać od 2 do 50 znaków.')
    .matches(/^[a-zA-Z0-9ąęłńóśżźĄĘŁŃÓŚŻŹ\s]+$/)
    .withMessage('Imię i nazwisko może zawierać tylko litery i spacje.'),

  // Walidacja e-maila
  check('email')
    .trim()
    .isEmail().withMessage('Nieprawidłowy format adresu e-mail.')
    .normalizeEmail(),

  // Walidacja wiadomości
  check('message')
    .trim()
    .not().isEmpty().withMessage('Pole wiadomości jest wymagane.')
    .isLength({ min: 2, max: 1000 }).withMessage('Wiadomość musi zawierać od 10 do 1000 znaków.')
    .matches(/^[a-zA-Z0-9ąęłńóśżźĄĘŁŃÓŚŻŹ\s]+$/)

];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};