import { Badge, RankInfo } from '../types';

export const BADGES: Badge[] = [
  {
    id: 'badge-fire',
    title: 'CHIẾN BINH LỬA',
    description: 'Hoàn thành chủ đề Cháy nhà',
    icon: '🔥',
    category: 'fire',
  },
  {
    id: 'badge-earthquake',
    title: 'BẢN LĨNH ĐẤT',
    description: 'Hoàn thành chủ đề Động đất',
    icon: '🌎',
    category: 'earthquake',
  },
  {
    id: 'badge-reflex',
    title: 'NGƯỜI PHẢN XẠ',
    description: 'Đạt độ chính xác trên 80% trong bài thi',
    icon: '🛡️',
  },
  {
    id: 'badge-speed',
    title: 'NHANH NHƯ CHỚP',
    description: 'Hoàn thành bài thi ở Chế độ Phản xạ (10s/câu)',
    icon: '⚡',
  },
  {
    id: 'badge-survivalist',
    title: 'BẢN LĨNH SINH TỒN',
    description: 'Hoàn thành đầy đủ cả 5 chủ đề tình huống',
    icon: '🏆',
  },
  {
    id: 'badge-master',
    title: 'BẬC THẦY SINH TỒN',
    description: 'Đạt điểm tuyệt đối 100% (50/50 câu đúng)',
    icon: '👑',
  },
];

export const RANKS: RankInfo[] = [
  {
    title: 'NGƯỜI MỚI',
    icon: '🌱',
    minPoints: 0,
    maxPoints: 150,
    comment: 'Cần tích cực tìm hiểu thêm các kỹ năng an toàn cơ bản để bảo vệ bản thân và người xung quanh.',
  },
  {
    title: 'NGƯỜI BIẾT BẢO VỆ',
    icon: '🛡️',
    minPoints: 160,
    maxPoints: 300,
    comment: 'Bạn đã nắm được các nguyên tắc cơ bản, hãy rèn luyện thêm để phản xạ nhanh hơn.',
  },
  {
    title: 'NGƯỜI XỬ LÝ TỐT',
    icon: '🔥',
    minPoints: 310,
    maxPoints: 400,
    comment: 'Rất tốt! Bạn có sự hiểu biết vững vàng trong phần lớn tình huống nguy hiểm.',
  },
  {
    title: 'BẢN LĨNH SINH TỒN',
    icon: '🏆',
    minPoints: 410,
    maxPoints: 470,
    comment: 'Tuyệt vời! Bản lĩnh và kỹ năng của bạn rất đáng tin cậy trong các tình huống khẩn cấp.',
  },
  {
    title: 'BẬC THẦY ỨNG PHÓ',
    icon: '👑',
    minPoints: 480,
    maxPoints: 500,
    comment: 'Xuất sắc tuyệt đối! Bạn là bậc thầy xử lý tình huống nguy hiểm, sẵn sàng bảo vệ mình và mọi người!',
  },
];

/**
 * Calculates rank based on points or normalized percentage
 */
export function getRankByScore(score: number, maxScore: number = 500): RankInfo {
  // Normalize to 500 scale for consistent rank grading
  const normalized = maxScore > 0 ? (score / maxScore) * 500 : 0;
  
  if (normalized >= 475) return RANKS[4];
  if (normalized >= 405) return RANKS[3];
  if (normalized >= 305) return RANKS[2];
  if (normalized >= 155) return RANKS[1];
  return RANKS[0];
}
