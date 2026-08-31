import { Book, StudentLeaderboard, Article } from '../types';

const sampleContent = `Mặt trời đã lên cao. Ánh nắng rực rỡ xuyên qua từng kẽ lá, chiếu xuống mặt đất tạo thành những đốm sáng nhảy múa. Khởi đầu một ngày mới luôn mang lại cho chúng ta những năng lượng tích cực và tràn đầy sức sống. 

Cuốn sách này sẽ đưa bạn vào một cuộc hành trình khám phá những điều kỳ diệu nhất của thế giới xung quanh. Hãy mở rộng tâm hồn và cùng bước vào trang sách đầu tiên nhé!

"Cuộc sống là một cuộc phiêu lưu, hoặc không là gì cả." - Helen Keller`;

const baseBooks: Book[] = [
  {
    id: '1',
    title: 'Dế Mèn Phiêu Lưu Ký',
    author: 'Tô Hoài',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
    category: 'Truyện thiếu nhi',
    grade: 3,
    description: 'Cuộc phiêu lưu kỳ thú của chú Dế Mèn dũng cảm và bài học về tình bạn.',
    likes: 120,
    isPopular: true,
    content: `Bởi tôi ăn uống điều độ và làm việc có chừng mực nên tôi chóng lớn lắm. Chẳng bao lâu, tôi đã trở thành một chàng dế thanh niên cường tráng. Đôi càng tôi mẫm bóng. Những cái vuốt ở chân, ở khoeo cứ cứng dần và nhọn hoắt...\n\nĐây là cuốn sách kể về cuộc hành trình kỳ thú của Dế Mèn, một chàng dế bộc trực nhưng cũng đầy tự kiêu, đã đi qua nhiều vùng đất, kết bạn với nhiều loài vật và học được những bài học quý giá về tình bạn và lòng dũng cảm.`,
  },
  {
    id: '2',
    title: 'Mười vạn câu hỏi vì sao',
    author: 'Nhiều tác giả',
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80',
    category: 'Khám phá khoa học',
    grade: 4,
    description: 'Giải đáp những thắc mắc ngộ nghĩnh của các bé về thế giới xung quanh.',
    likes: 85,
    isNew: true,
    content: `Vì sao bầu trời lại màu xanh? Vì sao con người lại buồn ngủ? Vì sao trái đất lại hình cầu? Cuốn sách này sẽ mang đến cho bạn những lời giải đáp thú vị và khoa học nhất cho hàng vạn câu hỏi 'Vì sao' mà các bạn nhỏ thường thắc mắc về thế giới tự nhiên xung quanh.\n\nHãy cùng mở từng trang sách và trở thành một nhà bác học nhí nhé!`,
  },
  {
    id: '3',
    title: 'Hoàng Tử Bé',
    author: 'Antoine de Saint-Exupéry',
    coverImage: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=400&q=80',
    category: 'Truyện cổ tích',
    grade: 5,
    description: 'Câu chuyện đầy ý nghĩa về cậu bé đến từ tiểu hành tinh B612.',
    likes: 200,
    isPopular: true,
    content: `Người lớn thật kỳ lạ. Họ luôn yêu cầu những con số và những lời giải thích cho mọi thứ, nhưng lại chẳng bao giờ hiểu được những điều giản dị và đẹp đẽ nhất.\n\nCậu bé với mái tóc vàng rực rỡ đến từ tiểu hành tinh B612 nhỏ bé sẽ kể cho bạn nghe về bông hồng duy nhất của cậu, về con cáo khao khát được thuần hóa, và về chuyến du hành qua các hành tinh kỳ lạ...`,
  },
  {
    id: '4',
    title: 'Atlas Không Gian',
    author: 'National Geographic Kids',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80',
    category: 'Khám phá khoa học',
    grade: 5,
    description: 'Khám phá vũ trụ bao la với những hình ảnh tuyệt đẹp về các hành tinh.',
    likes: 150,
    isNew: true,
    isPopular: true,
    content: `Vũ trụ bao la chứa đựng muôn vàn bí ẩn. Từ hệ mặt trời của chúng ta đến những thiên hà xa xôi nhất, cuốn Atlas Không Gian này sẽ cung cấp cho bạn những hình ảnh tuyệt đẹp và kiến thức thiên văn học cơ bản nhất.\n\nBạn đã sẵn sàng để trở thành một phi hành gia khám phá vũ trụ chưa?`,
  },
  {
    id: '5',
    title: 'Góc Sân Và Khoảng Trời',
    author: 'Trần Đăng Khoa',
    coverImage: 'https://images.unsplash.com/photo-1474366521946-c3d4b507abf2?auto=format&fit=crop&w=400&q=80',
    category: 'Truyện thiếu nhi',
    grade: 2,
    description: 'Những bài thơ trong trẻo, đáng yêu về tuổi thơ và làng quê.',
    likes: 110,
    isPopular: true,
    content: `Góc sân nho nhỏ mới xây\nChiều chiều em đứng nơi này em trông\nThấy trời xanh biếc mênh mông\nCánh cò trắng muốt bay vòng trước hiên...\n\nNhững vần thơ trong veo của Trần Đăng Khoa đưa chúng ta về một miền quê yên ả, nơi có cánh cò, có vầng trăng, có góc sân nhỏ đong đầy kỷ niệm tuổi thơ.`,
  },
  {
    id: '6',
    title: 'Thế Giới Khủng Long',
    author: 'DK Publishing',
    coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80',
    category: 'Khám phá khoa học',
    grade: 3,
    description: 'Sách bách khoa toàn thư hình ảnh về các loài khủng long cổ đại.',
    likes: 175,
    isNew: true,
    content: `Khủng long Bạo Chúa (T-Rex) là một trong những loài ăn thịt lớn nhất từng tồn tại, với hàm răng sắc nhọn và lực cắn khủng khiếp. Trong khi đó, khủng long Cổ Dài (Brachiosaurus) lại hiền hòa ăn lá cây trên cao.\n\nCuốn sách này sẽ tái hiện lại kỷ Jura và kỷ Phấn Trắng một cách chân thực nhất qua những thước ảnh và thông tin chi tiết về từng loài khủng long.`,
  },
  {
    id: '7',
    title: 'Kỹ Năng Sống Dành Cho Học Sinh',
    author: 'Nhiều Tác Giả',
    coverImage: 'https://images.unsplash.com/photo-1544716278-e513176f20b5?auto=format&fit=crop&w=400&q=80',
    category: 'Kỹ năng sống',
    grade: 4,
    description: 'Những kỹ năng cơ bản giúp bé tự lập, giao tiếp tốt và an toàn.',
    likes: 95,
    isNew: false,
    content: `Trong cuộc sống hàng ngày, các bạn nhỏ sẽ gặp phải rất nhiều tình huống bất ngờ. Làm thế nào để an toàn khi ở nhà một mình? Làm sao để kết bạn mới? Làm thế nào để quản lý thời gian hiệu quả?\n\nCuốn sách Kỹ Năng Sống này như một người bạn đồng hành, hướng dẫn các em từng bước nhỏ để tự tin và tự lập hơn mỗi ngày.`,
  },
  {
    id: '8',
    title: 'Chuyện Con Mèo Dạy Hải Âu Bay',
    author: 'Luis Sepúlveda',
    coverImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80',
    category: 'Truyện thiếu nhi',
    grade: 5,
    description: 'Một câu chuyện cảm động về tình yêu thương và giữ lời hứa.',
    likes: 310,
    isPopular: true,
    content: `Zorba, một con mèo mun to đùng mập ú, đã hứa với cô hải âu Kengah đang hấp hối ba điều: sẽ không ăn quả trứng, sẽ chăm lo cho quả trứng nở ra con, và điều khó nhất - dạy cho con hải âu con bay.\n\nMột câu chuyện xúc động, hài hước và thấm đẫm ý nghĩa về tình yêu thương vô điều kiện và lòng dũng cảm vượt qua giới hạn bản thân.`,
  },
  {
    id: '9',
    title: 'Truyện Cổ Tích Andersen',
    author: 'Hans Christian Andersen',
    coverImage: 'https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&w=400&q=80',
    category: 'Truyện cổ tích',
    grade: 2,
    description: 'Tuyển tập những câu chuyện cổ tích hay nhất của Andersen.',
    likes: 280,
    isPopular: true,
    content: `Ngày xửa ngày xưa, ở một vương quốc nọ, có một vị vua và một hoàng hậu...\n\nNhững câu chuyện cổ tích quen thuộc của Andersen như Cô Bé Bán Diêm, Nàng Tiên Cá, Vịt Con Xấu Xí... luôn mang theo những thông điệp nhân văn sâu sắc, nuôi dưỡng lòng trắc ẩn và trí tưởng tượng phong phú của bao thế hệ trẻ thơ.`,
  },
  {
    id: '10',
    title: 'Lịch Sử Việt Nam Bằng Tranh',
    author: 'NXB Trẻ',
    coverImage: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=400&q=80',
    category: 'Lịch sử',
    grade: 4,
    description: 'Tìm hiểu về các triều đại lịch sử Việt Nam qua những bức tranh sinh động.',
    likes: 140,
    isNew: false,
    content: `Lịch sử nước nhà trải dài hàng ngàn năm với bao trang sử hào hùng. Từ thời Hùng Vương dựng nước đến những cuộc khởi nghĩa chống giặc ngoại xâm của Hai Bà Trưng, Ngô Quyền, Trần Hưng Đạo...\n\nCuốn truyện tranh lịch sử này sẽ giúp các em học sinh tiếp cận lịch sử Việt Nam một cách sinh động, dễ nhớ và đầy tự hào.`,
  },
  {
    id: '11',
    title: 'Bách Khoa Thư Về Biển',
    author: 'Tác Giả Nước Ngoài',
    coverImage: 'https://images.unsplash.com/photo-1500930287596-c1ecaa373bb2?auto=format&fit=crop&w=400&q=80',
    category: 'Khám phá khoa học',
    grade: 3,
    description: 'Đáy đại dương có gì? Cùng lặn xuống biển sâu và khám phá nhé.',
    likes: 165,
    isNew: true,
    content: `Làm thế nào để tạo ra một chiếc núi lửa bằng baking soda? Nước kết tinh thành đá như thế nào? Tại sao nam châm lại hút sắt?\n\nCuốn sách tập hợp 101 thí nghiệm khoa học vui nhộn, dễ thực hiện ngay tại nhà với những vật liệu đơn giản. Đây là cơ hội tuyệt vời để các em vừa học vừa chơi, khơi dậy niềm đam mê khoa học.`,
  },
  {
    id: '12',
    title: 'Totto-chan Bên Cửa Sổ',
    author: 'Tetsuko Kuroyanagi',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
    category: 'Truyện thiếu nhi',
    grade: 5,
    description: 'Hồi ký về ngôi trường Tomoe và tuổi thơ tuyệt vời của cô bé Totto-chan.',
    likes: 420,
    isPopular: true,
    content: `Totto-chan là một cô bé hiếu động, thường bị coi là 'đứa trẻ hư' ở trường cũ. Nhưng khi chuyển đến trường Tomoe, một ngôi trường đặc biệt với những lớp học làm từ toa tàu cũ, cô bé đã được là chính mình.\n\nThầy hiệu trưởng Kobayashi đã lắng nghe Totto-chan suốt 4 tiếng đồng hồ, và từ đó, một cuộc sống học đường tuyệt vời đã mở ra...`,
  },
  {
    id: '13',
    title: 'Truyện Cổ Tích Việt Nam',
    author: 'Kho Tàng Văn Học Dân Gian',
    coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80',
    category: 'Truyện cổ tích',
    grade: 1,
    description: 'Sọ Dừa, Tấm Cám, Thạch Sanh... những truyện cổ nuôi dưỡng tâm hồn.',
    likes: 215,
    content: `Trong kho tàng văn học dân gian Việt Nam, truyện cổ tích luôn chiếm một vị trí quan trọng. Sọ Dừa tuy dị dạng nhưng lại tài giỏi và hiếu thảo; Tấm hiền lành vất vả cuối cùng cũng được làm hoàng hậu; Thạch Sanh dũng cảm diệt chằn tinh cứu công chúa...\n\nNhững câu chuyện răn dạy con người sống hướng thiện, ở hiền gặp lành.`,
  },
  {
    id: '15',
    title: 'Cẩm Nang Phòng Chống Đuối Nước',
    author: 'Bộ Giáo Dục',
    coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80',
    category: 'Kỹ năng sống',
    grade: 3,
    description: 'Tài liệu hướng dẫn an toàn môi trường nước cho trẻ em.',
    likes: 125,
    isNew: true,
    content: `Đuối nước là một trong những tai nạn thương tích phổ biến ở trẻ em. Cuốn cẩm nang này cung cấp những kiến thức quan trọng nhất: Nhận biết vùng nước nguy hiểm, cách xử lý khi bị chuột rút, cách sơ cứu người bị đuối nước...\n\nTrang bị kiến thức là cách tốt nhất để bảo vệ bản thân và những người xung quanh.`,
  },
  {
    id: '16',
    title: 'Danh Nhân Thế Giới',
    author: 'NXB Giáo Dục',
    coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80',
    category: 'Lịch sử',
    grade: 5,
    description: 'Những con người vĩ đại đã thay đổi lịch sử nhân loại.',
    likes: 190,
    content: `Thế giới đã được định hình bởi những bộ óc vĩ đại. Từ Thomas Edison với phát minh bóng đèn điện, Albert Einstein với thuyết tương đối, đến Marie Curie với những cống hiến cho hóa học và vật lý.\n\nTìm hiểu về cuộc đời và sự nghiệp của các danh nhân thế giới sẽ truyền cảm hứng mạnh mẽ cho thế hệ trẻ vững bước tương lai.`,
  },
  {
    id: 'sgk-1',
    title: 'Tiếng Việt 3 - Tập 1',
    author: 'Bộ Giáo dục và Đào tạo',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
    category: 'Sách giáo khoa',
    grade: 3,
    description: 'Sách giáo khoa Tiếng Việt lớp 3, tập 1, theo chương trình giáo dục phổ thông mới.',
    likes: 85,
    isPopular: true,
    content: sampleContent
  },
  {
    id: 'sgv-1',
    title: 'Thiết kế bài giảng Toán 3',
    author: 'Nhiều tác giả',
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80',
    category: 'Sách giáo viên',
    grade: 3,
    description: 'Sách hướng dẫn giáo viên giảng dạy môn Toán lớp 3.',
    likes: 42,
    content: sampleContent
  },
  {
    id: 'stk-1',
    title: 'Bồi dưỡng học sinh giỏi Toán 5',
    author: 'Nguyễn Áng',
    coverImage: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=400&q=80',
    category: 'Sách tham khảo',
    grade: 5,
    description: 'Sách tham khảo chuyên sâu bồi dưỡng năng lực học Toán cho học sinh lớp 5.',
    likes: 156,
    isNew: true,
    content: sampleContent
  }
];

export const mockBooks: Book[] = Array.from({ length: 100 }, (_, i) => {
  const baseBook = baseBooks[i % baseBooks.length];
  const isVariation = i >= baseBooks.length;
  
  return {
    ...baseBook,
    id: `${i + 1}`,
    title: isVariation ? `${baseBook.title} - Phần ${Math.floor(i / baseBooks.length) + 1}` : baseBook.title,
    likes: baseBook.likes + (isVariation ? Math.floor(Math.random() * 50) : 0),
    isNew: i % 3 === 0, // 33% new books
    isPopular: i % 2 === 0, // 50% popular books
  };
});

export const mockLeaderboard: StudentLeaderboard[] = [
  {
    id: 's1',
    studentName: 'Nguyễn Khoa Điềm',
    className: '5A',
    booksReadCount: 15,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4',
  },
  {
    id: 's2',
    studentName: 'Trần Bảo Ngọc',
    className: '3B',
    booksReadCount: 12,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka&backgroundColor=ffdfbf',
  },
  {
    id: 's3',
    studentName: 'Lê Hoàng Hải',
    className: '4C',
    booksReadCount: 10,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Leo&backgroundColor=c0aede',
  },
  {
    id: 's4',
    studentName: 'Phạm Phương Chi',
    className: '1A',
    booksReadCount: 8,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Liliana&backgroundColor=ffdfbf',
  },
  {
    id: 's5',
    studentName: 'Hoàng Tuấn Kiệt',
    className: '2B',
    booksReadCount: 6,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mason&backgroundColor=d1d4f9',
  }
];

const baseArticles: Article[] = [
  {
    id: '1',
    title: 'Hội thi kể chuyện theo sách cấp trường năm học 2025-2026',
    thumbnail: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    summary: 'Nhằm khuyến khích văn hóa đọc, Thư viện trường tổ chức hội thi kể chuyện dành cho tất cả các khối lớp với nhiều phần quà hấp dẫn.',
    category: 'Hoạt động Thư viện',
    readTime: '3 phút đọc',
    date: '15/08/2026',
    author: 'Cô Lan - Thủ thư',
    content: `Nhằm khơi dậy niềm đam mê đọc sách, bồi dưỡng tâm hồn và rèn luyện kỹ năng thuyết trình cho các em học sinh, Thư viện Trường Tiểu học Mỹ An long trọng tổ chức Hội thi "Kể chuyện theo sách" năm học 2025 - 2026.

### 🌟 Mục đích và Ý nghĩa của Hội thi
Hội thi là sân chơi bổ ích, lành mạnh giúp các em học sinh:
- Tự tin thể hiện năng khiếu kể chuyện, diễn xuất và cảm thụ văn học.
- Lan tỏa những cuốn sách hay, những bài học đạo đức ý nghĩa về tình bạn, lòng hiếu thảo, tình yêu quê hương đất nước.
- Nâng cao tinh thần tự giác đọc sách mỗi ngày tại thư viện và góc đọc sách gia đình.

### 📅 Thời gian và Đối tượng tham gia
- **Đối tượng:** Tất cả học sinh từ Khối 1 đến Khối 5 Trường Tiểu học Mỹ An.
- **Thời gian đăng ký:** Từ ngày 20/08/2026 đến hết ngày 30/08/2026 tại phòng Thư viện.
- **Vòng chung kết:** Dự kiến diễn ra vào sáng thứ Hai ngày 10/09/2026 tại Sân trường.

### 🎁 Cơ cấu Giải thưởng hấp dẫn
Ban Giám hiệu cùng Thư viện đã chuẩn bị rất nhiều phần thưởng giá trị bao gồm:
1. 01 Giải Đặc biệt: Bộ sách Bách khoa toàn thư thế giới và Huy hiệu "Đại sứ Văn hóa đọc".
2. 02 Giải Nhất: Bộ truyện tranh thiếu nhi và phiếu quà tặng sách.
3. 03 Giải Nhì & 05 Giải Ba: Cùng hàng chục phần quà khuyến khích dành cho các tiết mục ấn tượng.

Thư viện nhà trường rất mong nhận được sự hưởng ứng nhiệt tình từ quý thầy cô chủ nhiệm, quý phụ huynh và toàn thể các em học sinh!`
  },
  {
    id: '2',
    title: 'Top 5 cuốn sách khoa học được mượn nhiều nhất tháng 7',
    thumbnail: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80',
    summary: 'Cùng điểm qua những cuốn sách khoa học kỳ thú đang làm mưa làm gió tại thư viện Mỹ An trong tháng vừa qua.',
    category: 'Góc Giới thiệu Sách',
    readTime: '4 phút đọc',
    date: '01/08/2026',
    author: 'Admin Thư Viện',
    content: `Tháng 7 vừa qua ghi nhận kỷ lục mượn sách khoa học tại Thư viện Mỹ An với hơn 450 lượt mượn. Hãy cùng Cú Mèo Thông Thái điểm danh 5 cuốn sách được các bạn nhỏ yêu thích nhất nhé!

### 1. Mười vạn câu hỏi vì sao - Khám phá tự nhiên
Cuốn sách giải thích hàng trăm hiện tượng thiên nhiên kỳ thú bằng ngôn từ hài hước và hình ảnh minh họa sinh động. Tại sao bầu trời có màu xanh? Vì sao lá cây lại rụng vào mùa thu? Tất cả đều có lời giải đáp rõ ràng.

### 2. Atlas Không Gian dành cho thiếu nhi
Mang đến chuyến du hành ngoạn mục qua 8 hành tinh trong Hệ Mặt Trời. Cuốn sách khổ lớn với bản đồ các chòm sao phát quang là điểm nhấn thu hút đông đảo các bạn học sinh khối 4 và 5.

### 3. Bách Khoa Toàn Thư Thế Giới Động Vật
Cuốn sách đưa các em vào thế giới rừng rậm Amazon, đại dương sâu thẳm và sa mạc Sahara với hơn 500 loài sinh vật kỳ lạ.

### 4. Những thí nghiệm khoa học vui tại nhà
Tập hợp 50 thí nghiệm an toàn, dễ làm từ những vật dụng quen thuộc như chai nhựa, nước màu, baking soda giúp phát triển tư duy sáng tạo.

### 5. Robot và Công nghệ tương lai
Khám phá thế giới trí tuệ nhân tạo, xe tự hành và thám hiểm sao Hỏa được viết riêng cho lứa tuổi thiếu niên.

Các bạn nhỏ hãy ghé Thư viện Mỹ An ngay hôm nay để mượn những cuốn sách tuyệt vời này nhé!`
  },
  {
    id: '3',
    title: 'Quyên góp sách cũ - Trao tri thức, nhận yêu thương',
    thumbnail: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    summary: 'Chương trình thường niên nhằm xây dựng tủ sách dùng chung cho các bạn học sinh có hoàn cảnh khó khăn.',
    category: 'Phong trào Thi đua',
    readTime: '2 phút đọc',
    date: '20/07/2026',
    author: 'Đội Thiếu niên Tiền phong',
    content: `Mỗi cuốn sách trao đi là một mầm xanh tri thức được ươm mầm. Liên đội Trường Tiểu học Mỹ An phối hợp cùng Thư viện phát động phong trào quyên góp sách "Trao tri thức - Nhận yêu thương".

### 📚 Loại sách tiếp nhận:
- Truyện tranh thiếu nhi, truyện cổ tích, ngụ ngôn.
- Sách tham khảo, sách khoa học, kỹ năng sống.
- Sách giáo khoa các khối lớp còn mới và sạch đẹp.

### 📍 Địa điểm tiếp nhận:
- Bàn tiếp nhận tại sảnh chính Thư viện trường vào các giờ ra chơi từ thứ Hai đến thứ Sáu.

Cảm ơn tấm lòng sẻ chia ấm áp của tất cả các bạn học sinh và thầy cô giáo!`
  }
];

export const mockArticles: Article[] = Array.from({ length: 23 }, (_, i) => {
  if (i < baseArticles.length) return baseArticles[i];
  
  const base = baseArticles[i % baseArticles.length];
  const day = (i % 28) + 1;
  const month = (i % 12) + 1;
  const dateStr = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/2026`;

  const isNewsTopic = i % 2 === 0;
  
  return {
    ...base,
    id: `${i + 1}`,
    title: isNewsTopic ? `Hoạt động thư viện tuần ${i + 1}: Những cuốn sách mới đến` : `Giới thiệu sách hay: Chuyên đề ${i + 1}`,
    summary: `Cập nhật những thông tin mới nhất và các đầu sách thú vị được bổ sung vào thư viện trong thời gian qua. Đừng bỏ lỡ!`,
    date: dateStr,
    readTime: `${(i % 5) + 2} phút đọc`
  };
});
