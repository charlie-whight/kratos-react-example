import {
    isUiNodeAnchorAttributes,
    isUiNodeImageAttributes,
    isUiNodeInputAttributes,
    isUiNodeScriptAttributes,
    isUiNodeTextAttributes
} from '@ory/integrations/ui'
import {UiNode} from '@ory/kratos-client'
import {AuthFormButton, AuthFormField} from "../component";

// This helper function translates the html input type to the corresponding partial name.
export const toUiNodePartial = (node: UiNode) => {
    if (isUiNodeAnchorAttributes(node.attributes)) {
        return 'ui_node_anchor'
    } else if (isUiNodeImageAttributes(node.attributes)) {
        return 'ui_node_image'
    } else if (isUiNodeInputAttributes(node.attributes)) {

        switch (node.attributes.type) {
            case 'hidden':
                return 'default'
            case 'submit':
                return 'button'
            case 'button':
                return 'button'
            case 'checkbox':
                return 'ui_node_input_checkbox'
            default:
                return 'default'
        }

    } else if (isUiNodeScriptAttributes(node.attributes)) {
        return 'ui_node_script'
    } else if (isUiNodeTextAttributes(node.attributes)) {
        return 'ui_node_text'
    }

    return 'ui_node_input_default'
}
