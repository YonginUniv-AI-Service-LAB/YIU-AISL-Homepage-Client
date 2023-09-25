const validation = (value, rules, form) => {
  let valid = true;

  for (let rule in rules) {
    switch (rule) {
      case "isRequired":
        valid = valid && validateRequired(value);
        break;

      case "isOkay":
        valid = valid && validateOkay(value);
        break;

      case "isEmail":
        valid = valid && validateEmail(value);
        break;

      case "minLength":
        valid = valid && validateMinLength(value, rules[rule]);
        break;

      case "maxLength":
        valid = valid && validateMaxLength(value, rules[rule]);
        break;

      case "passwordConfirm":
        valid =
          valid &&
          validatePasswordConfirm(value, form[rules.passwordConfirm].value);
        break;

      case "checkId":
        valid = valid && validateCheckId(value);
        break;

      case "checkName":
        valid = valid && validateCheckName(value);
        break;

      case "checkPassword":
        valid = valid && validateCheckPassword(value);
        break;

      case "isImageFile":
        valid = valid && validateImageFile(value);
        break;

      default:
        valid = true;
    }
  }
  return valid;
};

// 필수입력
const validateRequired = (value) => {
  if (value !== "") {
    return true;
  }
  return false;
};

// 상관없음
const validateOkay = (value) => {
  if (value == null || value !== "") return true;
};

// 이메일 유효성
const validateEmail = (value) => {
  const expression =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return expression.test(String(value).toLocaleLowerCase());
};

// 최소글자수 유효성
const validateMinLength = (value, ruleValue) => {
  if (value.length >= ruleValue) {
    return true;
  }
  return false;
};

// 최대글자수 유효성
const validateMaxLength = (value, ruleValue) => {
  if (value.length <= ruleValue) {
    return true;
  }
  return false;
};

// 비밀번호재확인 유효성_비밀번호 일치 확인
const validatePasswordConfirm = (passwordConfirm, password) => {
  return passwordConfirm === password;
};

// 아이디 유효성 검사
const validateCheckId = (value) => {
  const expression = /^.*()(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
  return expression.test(String(value).toLocaleLowerCase());
};

// 이름 유효성 검사
const validateCheckName = (value) => {
  const expression = /^[가-힣]+$/;
  return expression.test(String(value).toLocaleLowerCase());
};

// 비밀번호 유효성 검사
const validateCheckPassword = (value) => {
  const expression = /^.*(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).*$/;
  return expression.test(String(value).toLocaleLowerCase());
};

// 이미지 파일 유효성 검사
const validateImageFile = (value) => {
  if (value != "") {
    let ext = value.slice(value.lastIndexOf(".") + 1).toLowerCase();

    if (!(ext == "gif" || ext == "jpg" || ext == "png")) {
      return false;
    }
  }
  return true;
};

export default validation;
