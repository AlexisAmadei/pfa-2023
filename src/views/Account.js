import React from "react";

import '@engie-group/fluid-design-tokens/lib/css/tokens.css';
import '@engie-group/fluid-design-system/lib/base.css';
import { NJButton } from '@engie-group/fluid-design-system-react';

export default function Account() {
    return (
        <div>
            <NJButton
                className="nj-button"
                size="large"
                variant="contained"
                title="Button"
                label="Button"
            />
            <h1>Account</h1>
        </div>
    );
}