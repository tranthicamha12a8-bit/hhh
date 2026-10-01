import { CategoryId } from '../types';

export interface SkillDetail {
  id: CategoryId;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  bannerGradient: string;
  mustRemember: {
    icon: string;
    title: string;
    detail: string;
  }[];
  mustAvoid: {
    icon: string;
    title: string;
    detail: string;
  }[];
  proTips: {
    title: string;
    content: string;
  }[];
}

export const SKILL_LIBRARY: SkillDetail[] = [
  {
    id: 'fire',
    title: 'Cháy nhà',
    subtitle: 'Kỹ năng thoát hiểm hỏa hoạn và ngạt khói độc',
    icon: '🔥',
    color: 'text-orange-400',
    bannerGradient: 'from-orange-600/30 via-red-600/20 to-slate-900',
    mustRemember: [
      {
        icon: '🚨',
        title: 'Báo động cho mọi người',
        detail: 'Hô hoán to rõ ràng: "CHÁY! CHÁY!", nhấn nút báo cháy khẩn cấp của tầng và gọi 114 ngay khi đã ra nơi an toàn.',
      },
      {
        icon: '🚪',
        title: 'Tìm lối thoát an toàn',
        detail: 'Bình tĩnh quan sát bảng chỉ dẫn thoát hiểm (EXIT) màu xanh lá. Luôn đi thang bộ thoát hiểm có buồng thang chống cháy.',
      },
      {
        icon: '🧎',
        title: 'Hạ thấp người khi có nhiều khói',
        detail: 'Khói độc và khí CO nóng bốc lên cao. Hãy cúi khom hoặc bò sát mặt sàn nơi còn nguồn dưỡng khí mát và trong lành hơn.',
      },
    ],
    mustAvoid: [
      {
        icon: '❌',
        title: 'Dùng thang máy',
        detail: 'Hệ thống điện dễ sập và giếng thang đóng vai trò như ống khói hút khí độc, nguy cơ mắc kẹt tử vong cực kỳ cao.',
      },
      {
        icon: '❌',
        title: 'Quay lại lấy đồ đạc',
        detail: 'Tài sản có thể mua lại, nhưng mạng sống chỉ có một. Chỉ 30 giây chần chừ có thể khiến đường thoát bị lửa và khói bịt kín.',
      },
      {
        icon: '❌',
        title: 'Hoảng loạn chạy vào nơi khói dày',
        detail: 'Hít phải 2-3 hơi khói độc đặc quánh có thể làm ngất lịm tức khắc. Cần tìm phòng có cửa sổ thông thoáng, bịt kín khe cửa để chờ cứu nạn.',
      },
    ],
    proTips: [
      {
        title: 'Kiểm tra độ nóng cánh cửa',
        content: 'Dùng mu bàn tay chạm nhẹ vào tay nắm cửa và mép cửa. Nếu thấy nóng ran, tuyệt đối không mở vì lửa đang áp sát phía sau!',
      },
      {
        title: 'Quy tắc Dừng - Nằm - Lăn',
        content: 'Nếu quần áo bắt lửa: Dừng lại ngay (không chạy làm bùng lửa), Nằm úp xuống đất che mặt, Lăn qua lại nhiều vòng để dập lửa.',
      },
      {
        title: 'Bịt mũi miệng bằng khăn ẩm',
        content: 'Nước trên khăn đóng vai trò như màng lọc giữ lại các hạt muội than và làm mát luồng khí hít vào cơ thể.',
      },
    ],
  },
  {
    id: 'earthquake',
    title: 'Động đất',
    subtitle: 'Phản xạ vàng giảm thiểu thương vong do sụp đổ',
    icon: '🌎',
    color: 'text-amber-400',
    bannerGradient: 'from-amber-600/30 via-yellow-600/20 to-slate-900',
    mustRemember: [
      {
        icon: '🛡️',
        title: 'Bảo vệ đầu và cổ',
        detail: 'Áp dụng quy tắc "Drop - Cover - Hold On": Cúi thấp người, chui dưới gầm bàn gỗ chắc chắn và giữ chặt chân bàn cho tới khi hết rung lắc.',
      },
      {
        icon: '🚫',
        title: 'Tránh cửa kính và vật dễ đổ',
        detail: 'Cách xa cửa sổ kính, gương lớn, tủ kệ cao không được gắn chặt vào tường và các chao đèn treo trần nhà.',
      },
      {
        icon: '🏃',
        title: 'Rời khỏi khu vực nguy hiểm sau rung chấn',
        detail: 'Khi hết cơn lắc chính, bình tĩnh đi cầu thang bộ ra khu vực bãi đất trống, công viên, sân trường rộng rãi.',
      },
    ],
    mustAvoid: [
      {
        icon: '❌',
        title: 'Chạy ra ban công hoặc nhảy lầu',
        detail: 'Ban công là kết cấu nhô ra ngoài rất dễ gãy sụp đầu tiên khi có dao động địa chấn ngang mạnh.',
      },
      {
        icon: '❌',
        title: 'Chạy chen lấn ở cầu thang lúc rung chuyển',
        detail: 'Mặt đất đang chao đảo khiến bạn rất dễ ngã gãy xương hoặc bị đám đông xô ngã giẫm đạp.',
      },
      {
        icon: '❌',
        title: 'Quay lại tòa nhà nứt vỡ lấy đồ',
        detail: 'Dư chấn sau động đất chính thường xảy ra bất ngờ sau vài phút hoặc vài giờ, làm sập hoàn toàn các kết cấu yếu.',
      },
    ],
    proTips: [
      {
        title: 'Nếu đang ở ngoài đường',
        content: 'Tránh xa mép tường nhà cao tầng (nguy cơ kính rơi), cột điện, dây điện đứt và cây to; tìm bãi đất trống và ngồi thấp bảo vệ gáy.',
      },
      {
        title: 'Tam giác sự sống tạm thời',
        content: 'Nếu không có bàn kiên cố, hãy cuộn tròn người bên cạnh chiếc ghế sofa dày hoặc giường lớn, lấy gối/ba lô che kín vùng đầu.',
      },
    ],
  },
  {
    id: 'gas',
    title: 'Rò rỉ gas',
    subtitle: 'Triệt tiêu mồi lửa và ngăn ngừa thảm họa nổ khí nén',
    icon: '🛢️',
    color: 'text-emerald-400',
    bannerGradient: 'from-emerald-600/30 via-teal-600/20 to-slate-900',
    mustRemember: [
      {
        icon: '👃',
        title: 'Chú ý mùi gas bất thường',
        detail: 'Mùi trứng thối đặc trưng nồng nặc là tín hiệu rò rỉ gas. Hãy bình tĩnh, dùng khăn che mũi và lập tức hành động an toàn.',
      },
      {
        icon: '🚫',
        title: 'Không tạo tia lửa',
        detail: 'Tuyệt đối không bật que diêm, bật lửa, không cắm hay rút phích cắm điện, không bật tắt bất kỳ công tắc bóng đèn nào.',
      },
      {
        icon: '🚪',
        title: 'Rời khỏi khu vực và báo người lớn',
        detail: 'Nhanh chóng bước ra ngoài nơi thoáng khí. Chỉ gọi điện thoại cứu hộ khi đã cách xa khu vực rò rỉ ít nhất 20-30m.',
      },
    ],
    mustAvoid: [
      {
        icon: '❌',
        title: 'Bật quạt điện hay máy hút mùi',
        detail: 'Động cơ quạt điện sinh ra tia lửa hồ quang nhỏ xíu bên trong công tắc và rotor, đủ để kích nổ toàn bộ lượng khí gas trong phòng!',
      },
      {
        icon: '❌',
        title: 'Dùng điện thoại trong phòng nồng nặc gas',
        detail: 'Sóng vi ba và mạch pin điện thoại khi nhận chuông có thể tạo vi tia lửa kích cháy trong không khí bão hòa gas.',
      },
      {
        icon: '❌',
        title: 'Tự ý tháo vặn bình gas nếu không có kỹ năng',
        detail: 'Vặn sai ren có thể làm gãy van hoặc xì khí ồ ạt hơn, gây ngạt thở và nguy hiểm tính mạng.',
      },
    ],
    proTips: [
      {
        title: 'Cách thông gió an toàn',
        content: 'Mở nhẹ nhàng các cánh cửa sổ và cửa chính bằng tay. Dùng quạt nan tre hoặc quạt giấy phẩy nhẹ nhàng để đẩy khí ra ngoài.',
      },
      {
        title: 'Khóa van bình gas',
        content: 'Nếu có thể tiếp cận van bình gas an toàn mà không có lửa, hãy xoay van theo chiều kim đồng hồ (chiều chữ CLOSE) để khóa nguồn cung.',
      },
    ],
  },
  {
    id: 'elevator',
    title: 'Kẹt thang máy',
    subtitle: 'Giữ vững tâm lý, không ngạt thở và tuân thủ cứu hộ',
    icon: '🛗',
    color: 'text-blue-400',
    bannerGradient: 'from-blue-600/30 via-cyan-600/20 to-slate-900',
    mustRemember: [
      {
        icon: '😌',
        title: 'Giữ bình tĩnh',
        detail: 'Cabin thang máy có khe thông khí tự nhiên, bạn KHÔNG THỂ bị ngạt thở. Thang máy có hệ thống cáp chịu tải nhiều lần và phanh chống rơi tự động.',
      },
      {
        icon: '🆘',
        title: 'Bấm nút báo động/liên lạc',
        detail: 'Nhấn nút chuông màu vàng hoặc nút điện thoại Intercom để nối máy với phòng kỹ thuật, ban quản lý tòa nhà trực 24/7.',
      },
      {
        icon: '👨‍🚒',
        title: 'Chờ lực lượng hỗ trợ',
        detail: 'Đội kỹ thuật sẽ có cần gạt cơ khí hạ cabin về bằng tầng và dùng chìa khóa đặc chủng mở cửa an toàn cho bạn ra ngoài.',
      },
    ],
    mustAvoid: [
      {
        icon: '❌',
        title: 'Tự trèo cạy cửa ra ngoài',
        detail: 'Thang đang dừng lơ lửng giữa 2 tầng; nếu bạn cạy cửa trèo ra, chỉ cần thang trượt một chút bạn sẽ bị kẹp hoặc rơi thẳng xuống đáy hố thang!',
      },
      {
        icon: '❌',
        title: 'Nhảy nhót hoặc đập phá bảng điều khiển',
        detail: 'Làm hỏng hệ thống mạch điện tử khiến nhân viên cứu hộ bên ngoài khó nhận biết vị trí cabin và không thể liên lạc được với bạn.',
      },
      {
        icon: '❌',
        title: 'Trèo lên nắp thang máy',
        detail: 'Nắp thang chỉ dành cho kỹ thuật viên và trên nóc có hệ thống dây điện trần cao thế rất dễ giật chết người.',
      },
    ],
    proTips: [
      {
        title: 'Bảo tồn năng lượng và oxy',
        content: 'Ngồi tựa lưng vào vách cabin, hơi gập đầu gối. Nếu có người trong thang sợ hãi, hãy nói chuyện nhẹ nhàng để trấn an họ.',
      },
      {
        title: 'Tiết kiệm pin điện thoại',
        content: 'Sóng trong giếng thang rất yếu làm pin cạn rất nhanh. Gọi 1 cuộc thông báo vị trí thang rõ ràng cho người thân, sau đó giảm sáng và giữ pin.',
      },
    ],
  },
  {
    id: 'lightning',
    title: 'Sét đánh',
    subtitle: 'Nhận biết đám mây dông và cách phòng tránh sét phóng tạt',
    icon: '⚡',
    color: 'text-yellow-400',
    bannerGradient: 'from-yellow-600/30 via-amber-600/20 to-slate-900',
    mustRemember: [
      {
        icon: '🏠',
        title: 'Tìm nơi trú ẩn kiên cố',
        detail: 'Vào ngay trong tòa nhà bê tông cốt thép kiên cố hoặc xe ô tô kim loại đóng kín cửa (nguyên lý lồng Faraday triệt tiêu điện trường).',
      },
      {
        icon: '🌳',
        title: 'Không trú dưới cây cao đứng riêng lẻ',
        detail: 'Cây cao là cột thu lôi tự nhiên. Sét đánh vào ngọn cây sẽ phóng điện tạt ngang sang người đứng bên dưới với điện thế hàng triệu Vôn.',
      },
      {
        icon: '⚡',
        title: 'Tránh vùng trống trải và vùng nước',
        detail: 'Rời khỏi ao hồ, bãi biển, sân vận động, ruộng lúa ngay lập tức. Nước dẫn điện cực tốt khiến người ở xa hàng chục mét cũng bị giật.',
      },
    ],
    mustAvoid: [
      {
        icon: '❌',
        title: 'Cầm ô dù có cán/nan kim loại',
        detail: 'Cây dù giương cao hướng lên trời biến bạn thành điểm cao nhọn nhất hút luồng tiên đạo sét đánh trực diện vào đầu.',
      },
      {
        icon: '❌',
        title: 'Đứng sát cửa sổ kính hoặc tắm bồn',
        detail: 'Dòng điện sét có thể đánh vào ăng-ten, đường ống nước kim loại hoặc đường dây điện gia đình lan truyền vào phòng.',
      },
      {
        icon: '❌',
        title: 'Nằm áp sát toàn thân xuống đất trống',
        detail: 'Điện thế bước mặt đất sẽ truyền qua suốt chiều dài cơ thể làm ngừng tim. Cần chụm 2 chân lại ngồi xổm.',
      },
    ],
    proTips: [
      {
        title: 'Tư thế trú sét ngoài trời (Lightning Crouch)',
        content: 'Chụm hai gót chân sát nhau, ngồi xổm trên mũi bàn chân, gập người che tai và cúi đầu. Giảm tối đa diện tích tiếp xúc với mặt đất!',
      },
      {
        title: 'Quy tắc đếm 30/30',
        content: 'Nhìn thấy chớp, đếm số giây tới khi nghe sấm: nếu dưới 30 giây, sét đang ở rất gần (dưới 10km), phải tìm chỗ trú ngay. Chờ 30 phút sau tiếng sấm cuối cùng mới ra ngoài.',
      },
    ],
  },
];
