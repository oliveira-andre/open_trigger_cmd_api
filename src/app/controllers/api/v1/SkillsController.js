class SkillsController {
  async index(req, res) {
    res.json({ ok: true });
  }
}

export default new SkillsController();
