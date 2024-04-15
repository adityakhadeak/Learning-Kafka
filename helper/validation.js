const createUserValidator=[
    check('username','Username is required').not().notEmpty().isString(),
    check('email','Enter valid email address').isEmail().normalizeEmail({gmail_remove_dots:true}),
    check('password','Password must be of atleast one special and 6 characters long').isStrongPassword({minLength:6,minLowercase:1,minUppercase:1,minNumbers:1,minSymbols:1})
]

const updateUserValidator=[
    check('username','Username is required').not().notEmpty().isString(),
    check('email','Enter valid email address').isEmail().normalizeEmail({gmail_remove_dots:true}),
    check('password','Password must be of atleast one special and 6 characters long').isStrongPassword({minLength:6,minLowercase:1,minUppercase:1,minNumbers:1,minSymbols:1})
]

module.exports={updateUserValidator,createUserValidator}