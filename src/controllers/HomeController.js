class HomeController {
  async index(req, res) {
    res.json('home');
  }
}

export default new HomeController();
