/*
 * Copyright 2021 KubeClipper Authors.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
import { testCase } from '../../../support/common';

const region = 'default';
const listUrl = '/region';
const port = Cypress.env('nodePort');
const username = Cypress.env('nodeUsername');
const password = Cypress.env('nodePassword');

describe('The Region Page', () => {
  beforeEach(() => {
    cy.login(listUrl);
  });

  afterEach(() => {
    cy.addContext();
  });

  it(...testCase('区域管理-查看区域-1').smoke().value(), () => {
    cy.checkTableRowLength();
  });

  it(...testCase('区域管理-区域详情-查看集群列表-1').smoke().value(), () => {
    cy.tableSearchText(region).goToDetail(0);
    cy.clickByDetailTabs('Cluster List');
    cy.checkTableRowLength();
  });

  it(...testCase('区域管理-区域详情-查看节点列表-1').smoke().value(), () => {
    cy.tableSearchText(region).goToDetail(0);
    cy.clickByDetailTabs('Nodes List');
    cy.checkTableRowLength();
    cy.clickActionButtonByTitle('Connect Terminal');
    cy.formInput('port', port)
      .formInput('username', username)
      .formInput('password', password)
      .clickModalActionSubmitButton();
  });

  it(...testCase('区域管理-区域详情-查看节点详情-1').smoke().value(), () => {
    cy.tableSearchText(region).goToDetail(0);
    cy.clickByDetailTabs('Nodes List');
    cy.goToDetail(0);
    cy.clickByDetailTabs('BaseDetail');
    cy.checkBaseDetailValue('default');
  });
});
