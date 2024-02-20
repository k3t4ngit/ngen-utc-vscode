module.exports = `
import { async } from '@angular/core/testing';
import { Observable, of as observableOf, throwError } from 'rxjs';

<%- importMocks.join('\\n') -%>

<%- providerMocks.mocks.join('\\n') %>

describe('<%- className %>', () => {
  let pipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {provide:MockClass,useValue:{}},
        <%- providerMocks.providers.join(',\\n        ') %>
      ]
    });
    pipe = TestBed.inject(<%- className %>);
  });

  <% for(var key in functionTests) { -%>
  <%- functionTests[key] -%>
  <% } -%>

});`;
