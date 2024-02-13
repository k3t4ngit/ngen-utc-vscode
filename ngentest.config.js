
module.exports = {
  framework: "karma",
  requiredComponentTestDeclarations: {
    directives: ['Mock'],
    pipes: ['Mock'],
  },
  providerMocks: {
    ElementRef: `nativeElement = {};`,
    Router: `navigate() {};`,
    Document: `querySelector() {};`,
    HttpClient: `post() {};`,
    TranslateService: `translate() {};`,
    EncryptionService: []
  }
}
