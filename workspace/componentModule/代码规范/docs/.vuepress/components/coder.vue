<template>
  <div class="coder">
    <p>动手试试</p>
    <textarea v-model="input" name id cols="30" rows="10" class="code-inputarea"></textarea>
    <button class="coder-exec-btn" @click="exec">执行</button>
    <div class="result-box">
      <p v-if="error">
        错误：
        <span class="code-error">{{ error }}</span>
      </p>
      <p v-else>结果：{{ result }}</p>
    </div>
  </div>
</template>

<script>
/**
 * 代码执行器
 * @author hyk
 */
import * as Util from "../../../src/static/js/utils@hyk/util";
import * as Dom from "../../../src/static/js/utils@hyk/dom";
import Device, { getEnvInfo } from "../../../src/static/js/utils@hyk/device";
import FormatTime, {
  fixDateString,
  diffDate,
  getDateInfo
} from "../../../src/static/js/utils@hyk/formatTime";
import Validators from "../../../src/static/js/utils@hyk/validators";
import Ticker from "../../../src/static/js/utils@hyk/ticker";
import CountDownTicker from "../../../src/static/js/utils@hyk/countDownTicker";
import ModelCheck, {
  extractElementFormRules
} from "../../../src/static/js/utils@hyk/modelCheck";
import Equal from "../../../src/static/js/utils@hyk/equal";
import FormatFileSize from "../../../src/static/js/utils@hyk/formatFileSize";

export default {
  name: "CoderExecer",
  props: {
    module: String,
    code: {
      type: String,
      default: ""
    },
    defaultInput: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      input: "",
      result: "",
      error: null
    };
  },
  created() {
    this.input = this.defaultInput;
  },
  methods: {
    exec() {
      try {
        this.error = null;
        switch (this.module) {
          case "util":
            Object.entries(Util).forEach(([k, v]) => {
              window[k] = v;
            });
            break;
          case "dom":
            Object.entries(Dom).forEach(([k, v]) => {
              window[k] = v;
            });
            break;
          case "device":
            window.Device = Device;
            window.getEnvInfo = getEnvInfo;
            break;
          case "formatTime":
            window.FormatTime = FormatTime;
            window.fixDateString = fixDateString;
            window.diffDate = diffDate;
            window.getDateInfo = getDateInfo;
            break;
          case "validators":
            window.Validators = Validators;
            break;
          case "ticker":
            window.Ticker = Ticker;
            break;
          case "countDownTicker":
            window.CountDownTicker = CountDownTicker;
            break;
          case "modelCheck":
            window.ModelCheck = ModelCheck;
            window.extractElementFormRules = extractElementFormRules;
            break;
          case "equal":
            window.equal = Equal;
            break;
          case "formatFileSize":
            window.formatFileSize = FormatFileSize;
            break;
        }
        this.result = eval(this.code + this.input);
      } catch (error) {
        console.error(error);
        this.error = error;
      }
    }
  }
};
</script>

<style>
.code-inputarea {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
  font-size: 14px;
  color: #4b4b4b;
  width: 100%;
  padding: 10px;
  line-height: 1.5;
  box-sizing: border-box;
  outline: none;
  appearance: none;
}
.code-inputarea:focus,
.code-inputarea:active {
  border: 1px solid #46bd87;
}
.code-error {
  color: red;
}
</style>