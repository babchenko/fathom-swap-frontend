import React from "react";
import { renderWithProvider } from "../../testHelpers";
import Text from "../../components/Text/Text";

it("renders correctly", () => {
  const { asFragment } = renderWithProvider(<Text>fathom</Text>);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      .c0 {
      color: #280D5F;
      font-weight: 400;
      line-height: 1.5;
      font-size: 16px;
    }

    <div
        class="c0"
        color="text"
        font-size="16px"
      >
        fathom
      </div>
    </DocumentFragment>
  `);
});
