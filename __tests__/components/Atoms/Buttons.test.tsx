import { fireEvent, render } from '@testing-library/react';
import { NextButton } from '../../../src/components/Atoms/Buttons';

describe('NextButton test', () => {
    const NextButtonOnClickMock = jest.fn();
    const NEXT_BUTTON_TEST_TEXT = 'next_button_text_text';
    test('NextButton render with text and onClick works', () => {
        const { getByText } = render(<NextButton
            buttonText={ NEXT_BUTTON_TEST_TEXT }
            onClick={ NextButtonOnClickMock }
        />);
        fireEvent.click(getByText(NEXT_BUTTON_TEST_TEXT));
    });
});
