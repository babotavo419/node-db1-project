const router = require('express').Router()
const Account = require('./accounts-model')
const {
  checkAccountPayload,
  checkAccountId,
  checkAccountNameUnique,
} = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.getAll()
    res.json(accounts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.json(req.account)
})

router.post('/', 
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const newAccountId = await Account.create(req.body)  // this will be just the ID now
      const newAccount = await Account.getById(newAccountId);  // get the account using the ID
      res.status(201).json(newAccount)
    } catch (err) {
      next(err)
    }
})

router.put('/:id',
  checkAccountId,
  checkAccountPayload,
  async (req, res, next) => {
    try {
      const updatedAccount = await Account.updateById(req.params.id, req.body)
      res.json(updatedAccount)
    } catch (err) {
      next(err)
    }
})

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    await Account.deleteById(req.params.id)
    res.json(req.account)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
