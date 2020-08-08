class SessionsController {
  async store(req, res) {
    return res.json({ ok: true })
  }
}

export default new SessionsController();
