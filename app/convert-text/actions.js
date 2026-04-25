"use server";

import postConvertText from "@/api/post-convert-text";

export async function convertTextAction(prevState, formData) {
    const inputText = formData.get('inputText');

    if (!inputText.trim()) {
        return {
            status: 'error',
            message: '請輸入簡體中文文本',
            converted_text: ''
        };
    }

    try {
        const result = await postConvertText(inputText);
        return {
            status: 'success',
            message: '轉換成功！',
            converted_text: result.converted_text
        };
    } catch (error) {
        return {
            status: 'error',
            message: '轉換失敗，請稍後再試',
            converted_text: ''
        };
    }
}