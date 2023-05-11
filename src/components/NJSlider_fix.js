import React from "react";

import '@engie-group/fluid-design-tokens/lib/css/tokens.css';
import '@engie-group/fluid-design-system/lib/base.css';

export default function NJSliderfix() {
  return (
    <form>
      <div class="nj-slider">
        <label for="formControlSlider">Slider label</label>
        <input min="0" type="range" max="10" step=".1" id="formControlSlider" />
      </div>
    </form>
  )
}