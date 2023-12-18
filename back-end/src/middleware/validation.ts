// import { Request, Response, NextFunction } from 'express';
// import { title } from 'process';
// const { check, validationResult } = require('express-validator');

// // User validation
// exports.validateUser = [
//     check('email').isEmail().withMessage('Nieprawidłowy adres email'),
//     check('firstName').not().isEmpty().withMessage('Imię jest wymagane'),
//     check('lastName').not().isEmpty().withMessage('Nazwisko jest wymagane'),
//     check('phoneNumber').isMobilePhone().withMessage('Nieprawidłowy numer telefonu'),
    
// ];
// exports.validateCourse = [
//     check('title').not().isEmpty().withMessage('Tytuł jest wymagany'),//50
//     check('description').not().isEmpty().withMessage('Opis jest wymagany'),//300   
//     check('price').not().isEmpty().withMessage('Cena jest wymagana'),// 
//     check('accountNumber').not().isEmpty().withMessage('Numer konta jest wymagany'),//18 validacje nr konta 
//     // check('status').not().isEmpty().withMessage('Status jest wymagany'), 
//     // check('category').not().isEmpty().withMessage('Kategoria jest wymagana'),

// ];

// export const validate = (req: Request, res: Response, next: NextFunction) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     next();
// };
import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import { CourseCategory } from '../interfaces/CourseCategory'; 



// Walidacja użytkownika
exports.validateUser = [
    check('email').isEmail().withMessage('Nieprawidłowy adres email'),
    check('firstName').not().isEmpty().withMessage('Imię jest wymagane'),
    check('lastName').not().isEmpty().withMessage('Nazwisko jest wymagane'),
    // check('phoneNumber').isMobilePhone().withMessage('Nieprawidłowy numer telefonu'),
];

// Walidacja kursu
exports.validateCourse = [
    //Tytył kursu
    check('title').not().isEmpty().withMessage('Tytuł jest wymagany')
    // .isLength({ max: 5}).withMessage('Tytuł nie może przekraczać 50 znaków'),
    ,

    //Opis kursu
    check('description').not().isEmpty().withMessage('Opis jest wymagany'),

    //Cena kursu
    check('price').not().isEmpty().withMessage('Cena jest wymagana')
    .isFloat({ gt: 0 }).withMessage('Cena musi być większa niż 0')
    .isFloat({ max: 99999.99 }).withMessage('Cena nie może przekraczać 99999.99')
    .matches(/^\d+(\.\d{1,2})?$/).withMessage('Cena musi być zaokrąglona do maksymalnie dwóch miejsc po przecinku'),


    //Numer konta
    check('accountNumber').not().isEmpty().withMessage('Numer konta jest wymagany'),
    
    // check('category').custom((value) => {
    //     // Sprawdza, czy wartość jest jednym z kluczy enuma CourseCategory
    //     return Object.keys(CourseCategory).includes(value);
    //   }).withMessage('Nieprawidłowa kategoria'),
      
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};