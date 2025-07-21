export const emotionList = [
    { value: 1, emoji: '😢', label: '슬픔' },
    { value: 2, emoji: '😐', label: '무덤덤' },
    { value: 3, emoji: '🙂', label: '보통' },
    { value: 4, emoji: '😄', label: '좋음' },
    { value: 5, emoji: '🤩', label: '최고' },
];
// value 기준으로 이모지 반환
export const emotionEmojiMap = emotionList.reduce((map, item) => {
    map[item.value] = item.emoji;
    return map;
}, {});
// value 기준으로 label 반환
export const emotionLabelMap = emotionList.reduce((map, item) => {
    map[item.value] = item.label;
    return map;
}, {});
