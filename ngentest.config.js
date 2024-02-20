
const klassTemplate = require('./ejs-templates/class.template.js');
const componentTemplate = require('./ejs-templates/component.template.js');
const directiveTemplate = require('./ejs-templates/directive.template.js');
const injectableTemplate = require('./ejs-templates/injectable.template.js');
const pipeTemplate = require('./ejs-templates/pipe.template.js');

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
  },

  outputTemplates: { // .spec.ts template written in ejs.
    klass: klassTemplate,
    component: componentTemplate,
    directive: directiveTemplate,
    injectable: injectableTemplate,
    pipe: pipeTemplate
  },
}
