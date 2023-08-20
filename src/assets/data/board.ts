import { MAX_MILEAGE, MANAGE, CHECK_BOX, NUM, CATEGORY } from './fields';
import Checkbox from '@mui/material/Checkbox';
/**
 * @breif 게시판 종류 정의
 * @details 사이드바에서 사용되는 종류들을 모두 enum 열거형으로 관리한다.
 */

export enum Board {
  '마일리지 카테고리',
  '마일리지 항목',
  '마일리지 조회',
  '마일리지 등록',
  '신청자 관리',
  '학생 관리',
  '사용자 관리',
  '학생별 마일리지 현황',
  '마일리지 선정결과',
  '설정',
}

/**
 * @breif 게시판 종류 리스트
 */

export const BoardList = [
  '마일리지 카테고리',
  '마일리지 항목',
  '마일리지 조회',
  '마일리지 등록',
  '신청자 관리',
  '학생 관리',
  '사용자 관리',
  '학생별 마일리지 현황',
  '마일리지 선정결과',
  '설정',
];

/**
 * @breif [마일리지 카테고리] 게시판
 */

export enum MileageCategoryBoard {
  'NUM' = NUM,
  'CATEGORY' = CATEGORY,
  'MAX_MILEAGE' = MAX_MILEAGE,
  'MANAGE' = MANAGE,
  'CHECK_BOX' = CHECK_BOX,
}
