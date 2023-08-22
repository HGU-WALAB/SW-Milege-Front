module.exports = {
  types: [
    { value: 'Feat', name: 'Feat: [새로운 기능 구현]' },
    { value: 'Fix', name: 'Fix: [코드 수정]' },
    { value: 'Docs', name: 'Docs: [문서 추가]' },
    {
      value: 'Style',
      name: 'Style: [코드 포매팅 , UX/UI 변경]',
    },
    {
      value: 'Refactor',
      name: 'Refactor: [코드 개선 , 리펙터링]',
    },
    {
      value: 'Test',
      name: 'Test: [테스트 코드 작성]',
    },
    {
      value: 'Chore',
      name: 'Chore: [환경 설정 파일 수정 , 패키지 추가]',
    },
  ],
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['body'],
  subjectLimit: 100,
};
