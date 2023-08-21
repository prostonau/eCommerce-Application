import Form, { checkValidyInputEmail, checkValidyInputPassword } from '../components/view/core/components/form';
import InputBox from '../components/view/core/components/form/input';
import Label from '../components/view/core/components/form/label';

describe('emptyTest', () => {
  it('tests is worling', () => {
    expect('true').toEqual('true');
  });
});

describe('testing input field functionality', () => {
  const inputFieldTest = new InputBox('input', 'form__input', 'email', 'login__input', 'Login', true);
  it('methods should return right values', () => {
    expect(inputFieldTest.getType()).toEqual('email');
    expect(inputFieldTest.getValue()).toEqual('');
    expect(inputFieldTest.render()).toBeInstanceOf(HTMLInputElement);
  });

  it('setter must change type', () => {
    expect(inputFieldTest.getType()).toEqual('email');
    inputFieldTest.setType('text');
    expect(inputFieldTest.getType()).toEqual('text');
  });
});

describe('testing label element functionality', () => {
  const labelTest = new Label('label', 'form__label', 'login__input', '', 'E-mail');
  it('Should return label HTMLelement', () => {
    expect(labelTest.render()).toBeInstanceOf(HTMLLabelElement);
  });
});

describe('testing form functionality', () => {
  const form = new Form('form', 'form__container');
  const labelTest = new Label('label', 'form__label', 'login__input', '', 'E-mail');
  form.generateLoginForm();

  it('Should return form HTMLelement', () => {
    expect(form.render()).toBeInstanceOf(HTMLFormElement);
  });

  it('should return validity check', () => {
    expect(form.checkValidyInput(form.inputLogin.render(), labelTest.render())).toEqual(false);
  });

  it('should check valid email', () => {
    const input = form.inputLogin.render() as HTMLInputElement;
    input.value = 'asia';
    expect(checkValidyInputEmail(input, labelTest.render())).toEqual(false);
    input.value = 'asia@';
    expect(checkValidyInputEmail(input, labelTest.render())).toEqual(false);
    input.value = 'asia@aa';
    expect(checkValidyInputEmail(input, labelTest.render())).toEqual(false);
    input.value = 'asia@aa.';
    expect(checkValidyInputEmail(input, labelTest.render())).toEqual(false);
    input.value = 'asia@aa.a';
    expect(checkValidyInputEmail(input, labelTest.render())).toEqual(true);
  });

  it('should check valid password', () => {
    const input = form.inputPassword.render() as HTMLInputElement;
    input.value = '123';
    expect(checkValidyInputPassword(input, labelTest.render())).toEqual(false);
    input.value = '123A';
    expect(checkValidyInputPassword(input, labelTest.render())).toEqual(false);
    input.value = '123Aa';
    expect(checkValidyInputPassword(input, labelTest.render())).toEqual(false);
    input.value = '12Aa!';
    expect(checkValidyInputPassword(input, labelTest.render())).toEqual(false);
    input.value = '123Aa!@#';
    expect(checkValidyInputPassword(input, labelTest.render())).toEqual(true);
  });
});
