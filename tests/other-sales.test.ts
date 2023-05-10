import { Builder, By, Key, until, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import 'mocha';

describe('Other Sales', () => {
  let driver: WebDriver;

  before(async() => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async() => {
    await driver.quit();
  });

  describe('Login and Prepare', () => {
    const username: string = 'test_piyarat@gmail.com';
    const password: string = '123456789'

    it('should login success', async () => {
      await driver.get('https://www.myorder.ai/auth/login');
      let usernameInput = await driver.findElement(By.id('email-input'));
      let passwordInput = await driver.findElement(By.id('password-input'));
      let loginButton = await driver.findElement(By.id('login-button'));

      await usernameInput.sendKeys(username);
      await passwordInput.sendKeys(password);
      await loginButton.click();
      await driver.wait(until.urlContains('team/list'), 5000);

      let url = await driver.getCurrentUrl();
      expect(url).to.contain('team/list');
    });

    it('should select team and able to order/other-sell', async () => {
      // await driver.executeScript('localStorage.setItem("teamId", "NjQ1YTIyMTVkMjE3NDMwMDE4OThmNzZj")');
      // await driver.executeScript('localStorage.setItem("joinTeamId", "NjQ1YTIyMTVkMjE3NDMwMDE4OThmNzZk")');
      await driver.get('https://www.myorder.ai/team/list');
      await driver.sleep(1000);
      
      let buttonTeam = await driver.findElement(By.id('645a2215d21743001898f76c'));
      await buttonTeam.click();

      await driver.get('https://www.myorder.ai/order/other-sell');
      await driver.wait(until.urlContains('order/other-sell'), 5000);
      let url = await driver.getCurrentUrl();

      expect(url).to.contain('order/other-sell');
    });
  });

  describe('Create Order', () => {
    it('should create order success', async () => {
      await driver.get('https://www.myorder.ai/order/other-sell');
      await driver.sleep(1000);
      
      
      let lineButton = await driver.findElement(By.id('line-button'));
      await lineButton.click();
      
      let customerNameInput = await driver.findElement(By.id('customer-name-input'));
      await customerNameInput.sendKeys('Piyrat Hanam');
      
      let telInput = await driver.findElement(By.id('tel-input'));
      await telInput.sendKeys('08123456789');
      
      let addressInput = await driver.findElement(By.id('address-input'));
      await addressInput.sendKeys('11/11');
      
      let searchAddressInput = await driver.findElement(By.id('search-address'));
      await searchAddressInput.sendKeys('10240');
      let searchAddressOption = await driver.findElement(By.css('.tt-suggestion.tt-selectable'));
      await searchAddressOption.click();
      await driver.sleep(1000);
      let buttonAgreeAddressSelect = await driver.findElement(By.css('.footer > button'));
      await buttonAgreeAddressSelect.click();

      let customerProductAdd = await driver.findElement(By.id('custom-product-add'));
      await customerProductAdd.click();
      await driver.sleep(1000);
      let customerProductNameInput = await driver.findElement(By.id('custom-product-name-input-0'));
      await customerProductNameInput.sendKeys('เสื้อ');
      let customerProductPriceInput = await driver.findElement(By.id('custom-product-price-input-0'));
      await customerProductPriceInput.sendKeys(199);
      let customerProductWeightInput = await driver.findElement(By.id('custom-product-weight-input-0'));
      await customerProductWeightInput.sendKeys(0.50);
      let customerProductAmountInput = await driver.findElement(By.id('product-amount-input-0'));
      await customerProductAmountInput.sendKeys(50);
      let buttonSelectProduct = await driver.findElement(By.id('select-product-button'));
      await buttonSelectProduct.click();
      await driver.sleep(1000);

      let buttonConfirm = await driver.findElement(By.className('confirm-button'));
      await buttonConfirm.click();

      // expected result
      await driver.sleep(1000);
      let notification =  await driver.findElement(By.css('#global-notifier .message'));
      let notificationText = await notification.getText();
      
      expect(notificationText).to.eq('บันทึกสำเร็จ');
    })
  });

  describe('Updade Order', () => {
    it('should create order success', async () => {
      await driver.get('https://www.myorder.ai/order/other-sell');
      await driver.sleep(1000);

      let buttonMenuOder = await driver.findElement(By.id('table-menu-0'));
      buttonMenuOder.click();
      await driver.sleep(1000);

      let buttonedit = await driver.findElement(By.id('table-menu-edit-0'));
      buttonedit.click();
      await driver.sleep(1000);

      let customerNameInput = await driver.findElement(By.css('#order-edit-modal #customer-name-input'));
      await customerNameInput.clear();
      await customerNameInput.sendKeys('Elsa Frozen');

      let customerTelnput = await driver.findElement(By.css('#order-edit-modal #customer-tel-input'));
      await customerTelnput.clear();
      await customerTelnput.sendKeys('0843552343');
      
      let customerAddressInput = await driver.findElement(By.css('#order-edit-modal #customer-address-input'));
      await customerAddressInput.clear();
      await customerAddressInput.sendKeys('45/1');

      let customerAddress = await driver.findElement(By.css('#order-edit-modal #customer-address'))
      await customerAddress.clear();
      await customerAddress.sendKeys('ต.โฆษิต อ.ตากใบ จ.นราธิวาส 96110');

      let buttonIncrementAmount = await driver.findElement(By.id('increase-amount-0'));
      await buttonIncrementAmount.click();

      let buttonSubmitChangeOrderBtn = await driver.findElement(By.id('submit-change-order-btn'));
      buttonSubmitChangeOrderBtn.click();

      // expected result
      await driver.sleep(1000);
      let notification =  await driver.findElement(By.css('#global-notifier .message'));
      let notificationText = await notification.getText();
      
      expect(notificationText).to.eq('บันทึกรายการสำเร็จแล้ว');
    })
  });

  describe('Delete Order', () => {
    it('should delete order success', async () => {
      await driver.get('https://www.myorder.ai/order/other-sell');
      await driver.sleep(1000);

      let buttonMenuOder = await driver.findElement(By.id('table-menu-0'));
      buttonMenuOder.click();
      await driver.sleep(1000);

      let buttonedit = await driver.findElement(By.id('table-remove-edit-0'));
      buttonedit.click();
      await driver.sleep(1000);

      let inputSearch = await driver.findElement(By.css('#confirm-modal input'));
      await inputSearch.sendKeys('ลบ');

      let buttonConfirmSubmitButton = await driver.findElement(By.id('confirm-submit-button'));
      buttonConfirmSubmitButton.click();

      // expected result
      await driver.sleep(1000);
      let notification =  await driver.findElement(By.css('#global-notifier .message'));
      let notificationText = await notification.getText();
      
      expect(notificationText).to.eq('ลบสำเร็จ 1 รายการ');
    })
  });
});