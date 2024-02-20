module.exports = `
import { TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';

<%- importMocks.join('\\n') -%>

<%- providerMocks.mocks.join('\\n') %>

describe('<%- className %>', () => {
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {provide:MockClass,useValue:{}},
        <%- providerMocks.providers.join(',\\n        ') %>
      ]
    });
    service = TestBed.inject(<%- className %>);
  });

  <% for(var key in functionTests) { -%>
  <%- functionTests[key] -%>
  <% } -%>

});`
