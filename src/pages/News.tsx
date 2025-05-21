
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import axiosInstance from './../axiosConfig/instance';

const newsItems = [
  {
    id: 1,
    title: "النادي يحقق فوزاً كبيراً في البطولة المحلية",
    description: "حقق فريقنا فوزاً مستحقاً بنتيجة ٣-٠ في المباراة النهائية للبطولة المحلية. وأشاد المدرب بأداء اللاعبين وروح الفريق العالية التي ساهمت في تحقيق هذا الإنجاز المهم.",
    date: "٢١ مايو ٢٠٢٥",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop",
    category: "كرة القدم",
    content: "في مباراة مثيرة أقيمت يوم أمس، حقق فريق النادي فوزاً مستحقاً بنتيجة ٣-٠ في المباراة النهائية للبطولة المحلية. سجل أهداف الفريق كل من محمد السيد في الدقيقة ٢٠، وأحمد خالد في الدقيقة ٥٥، وحسام الدين في الدقيقة ٨٧. وقد سيطر فريقنا على مجريات اللعب طوال المباراة، وأظهر مستوىً فنياً عالياً أشاد به الجميع. وفي تصريحات للمدرب بعد المباراة، أكد أن هذا الفوز جاء نتيجة للجهد الكبير الذي بذله اللاعبون خلال فترة الإعداد والتدريبات المكثفة التي خاضوها. كما أشاد بروح الفريق العالية والتفاهم الكبير بين اللاعبين، مؤكداً أن الفريق يتطلع للمزيد من الإنجازات في البطولات القادمة."
  },
  {
    id: 2,
    title: "افتتاح الملعب الجديد الأسبوع المقبل",
    description: "يستعد النادي لافتتاح الملعب الجديد بحضور كبار الشخصيات والرياضيين في حفل كبير يقام الأسبوع المقبل.",
    date: "١٨ مايو ٢٠٢٥",
    image: "https://images.unsplash.com/photo-1508098682722-e99c1a7329d0?q=80&w=1000&auto=format&fit=crop",
    category: "منشآت",
    content: "يستعد نادينا لافتتاح الملعب الجديد في حفل كبير يقام الأسبوع المقبل بحضور عدد من كبار الشخصيات والرياضيين. ويأتي افتتاح هذا الملعب ضمن خطة النادي لتطوير منشآته وتوفير أحدث المرافق الرياضية. ويتميز الملعب الجديد بمواصفات عالمية، حيث تم تجهيزه بأحدث التقنيات والمعدات، ويتسع لحوالي ٢٠ ألف متفرج. كما يضم الملعب مرافق متعددة مثل غرف تبديل الملابس المجهزة بأحدث التجهيزات، وقاعات للمؤتمرات الصحفية، ومركز طبي متكامل. وسيكون هذا الملعب إضافة كبيرة للنادي وللرياضة بشكل عام، حيث سيستضيف العديد من المباريات والفعاليات الرياضية الهامة."
  },
  {
    id: 3,
    title: "اللاعب محمد أحمد ينضم إلى صفوف النادي",
    description: "أعلن النادي رسمياً عن تعاقده مع اللاعب الدولي محمد أحمد لمدة موسمين قادمين بعد مفاوضات استمرت شهراً.",
    date: "١٥ مايو ٢٠٢٥",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000&auto=format&fit=crop",
    category: "تعاقدات",
    content: "أعلن نادينا رسمياً اليوم عن تعاقده مع اللاعب الدولي محمد أحمد لمدة موسمين قادمين. وجاء هذا التعاقد بعد مفاوضات استمرت لمدة شهر تقريباً مع اللاعب وناديه السابق. ويعتبر محمد أحمد من أبرز اللاعبين في مركزه، حيث سبق له تمثيل المنتخب الوطني في العديد من البطولات الدولية، كما حقق مع ناديه السابق العديد من الألقاب والبطولات. وأعرب اللاعب عن سعادته بالانضمام إلى صفوف النادي، مؤكداً أنه سيبذل قصارى جهده لمساعدة الفريق في تحقيق البطولات والإنجازات. ومن المتوقع أن ينضم اللاعب إلى تدريبات الفريق بداية من الأسبوع المقبل استعداداً للموسم الجديد."
  },
  {
    id: 4,
    title: "بدء التسجيل في الأكاديمية الرياضية للموسم الجديد",
    description: "يسر النادي الإعلان عن فتح باب التسجيل للأكاديمية الرياضية للفئات العمرية المختلفة للموسم الجديد.",
    date: "١٢ مايو ٢٠٢٥",
    image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=1000&auto=format&fit=crop",
    category: "أكاديمية",
    content: "يعلن النادي عن فتح باب التسجيل في الأكاديمية الرياضية للموسم الجديد لجميع الفئات العمرية من ٦ إلى ١٦ سنة. وتقدم الأكاديمية برامج تدريبية متميزة في مختلف الألعاب الرياضية مثل كرة القدم، كرة السلة، الجمباز، السباحة، وغيرها، تحت إشراف نخبة من المدربين المحترفين. وتهدف الأكاديمية إلى اكتشاف المواهب الرياضية وتنميتها، بالإضافة إلى غرس القيم الرياضية والأخلاقية لدى الناشئين. ويستمر التسجيل حتى نهاية الشهر الجاري، علماً بأن عدد المقاعد محدود. لمزيد من المعلومات حول الرسوم ومواعيد التدريب، يرجى التواصل مع إدارة الأكاديمية أو زيارة مقر النادي."
  },
  {
    id: 5,
    title: "تكريم لاعبي الفريق الأول بعد الفوز بكأس البطولة",
    description: "قام رئيس النادي بتكريم لاعبي الفريق الأول بعد الإنجاز الكبير بالفوز بكأس البطولة للمرة الثالثة على التوالي.",
    date: "١٠ مايو ٢٠٢٥",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop",
    category: "تكريم",
    content: "في أجواء احتفالية رائعة، قام رئيس النادي بتكريم لاعبي الفريق الأول بعد الإنجاز الكبير الذي حققوه بالفوز بكأس البطولة للمرة الثالثة على التوالي. وقد حضر حفل التكريم عدد من أعضاء مجلس إدارة النادي والجهاز الفني والإداري للفريق. وخلال الحفل، أعرب رئيس النادي عن فخره واعتزازه بما حققه اللاعبون، مؤكداً أن هذا الإنجاز هو ثمرة للجهد والتفاني والعمل الجاد على مدار الموسم. كما وعد بتقديم المزيد من الدعم للفريق في الموسم المقبل من أجل استمرار تحقيق البطولات والإنجازات. وفي ختام الحفل، تم تقديم مكافآت مالية للاعبين والجهاز الفني تقديراً لجهودهم وإنجازهم الكبير."
  },
  {
    id: 6,
    title: "النادي يوقع اتفاقية شراكة مع شركة رياضية عالمية",
    description: "وقع النادي اتفاقية شراكة استراتيجية مع إحدى كبرى الشركات الرياضية العالمية لرعاية الفريق الأول لمدة ثلاث سنوات.",
    date: "٥ مايو ٢٠٢٥",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1000&auto=format&fit=crop",
    category: "رعاية",
    content: "في خطوة هامة نحو تعزيز مكانته وتطوير إمكاناته، وقع النادي اليوم اتفاقية شراكة استراتيجية مع إحدى كبرى الشركات الرياضية العالمية لرعاية الفريق الأول لمدة ثلاث سنوات. وبموجب هذه الاتفاقية، ستقوم الشركة بتوفير المعدات والملابس الرياضية للفريق، بالإضافة إلى دعم مالي كبير. كما ستساهم الشركة في تطوير البنية التحتية للنادي وتنظيم معسكرات تدريبية خارجية للفريق. وأكد رئيس النادي أن هذه الشراكة تأتي ضمن إستراتيجية النادي للتطوير والنمو، وستساهم بشكل كبير في تحسين أداء الفريق وتحقيق المزيد من الإنجازات. وأضاف أن هناك عدة اتفاقيات أخرى قيد الدراسة مع شركات عالمية مختلفة لتعزيز مكانة النادي محلياً وإقليمياً."
  }
];

const News = () => {
  const [activePage, setActivePage] = React.useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);
  
  const visibleNews = newsItems.slice(
    activePage * itemsPerPage, 
    activePage * itemsPerPage + itemsPerPage
  );
  
  // const getNews = () => {
  //   try{
  //     const res = axiosInstance.get()
  //   }catch(err){
  //     console.log(err)
  //   }
  // }
  const goToNextPage = () => {
    setActivePage((prev) => (prev + 1) % totalPages);
  };
  
  const goToPrevPage = () => {
    setActivePage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* <Header /> */}
      <main>
        {/* Hero Section */}
        <div className="bg-secondary py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-white text-center mb-4">أخبار النادي</h1>
            <p className="text-white text-center max-w-2xl mx-auto">
              تابع آخر أخبار وفعاليات النادي وكن على اطلاع دائم بكل جديد
            </p>
          </div>
        </div>
        
        {/* News Content */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-secondary relative">
                آخر الأخبار
                <span className="absolute bottom-0 right-0 w-1/3 h-1 bg-primary mt-2"></span>
              </h2>
              
              <div className="flex space-x-2 space-x-reverse">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={goToPrevPage}
                  className="border-secondary text-secondary hover:bg-secondary hover:text-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={goToNextPage}
                  className="border-secondary text-secondary hover:bg-secondary hover:text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {visibleNews.map((news) => (
                <Card key={news.id} className="news-card overflow-hidden border border-gray-200">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={news.image} 
                      alt={news.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">{news.category}</span>
                      <span className="text-gray-500 text-sm">{news.date}</span>
                    </div>
                    <CardTitle className="text-xl">{news.title}</CardTitle>
                    <CardDescription className="text-gray-700">{news.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 line-clamp-3">{news.content.substring(0, 150)}...</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="text-primary p-0 hover:text-primary-dark">
                      قراءة المزيد
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <Button
                  key={index}
                  variant={activePage === index ? "default" : "outline"}
                  className={`rounded-full w-10 h-10 p-0 ${activePage === index ? 'bg-primary' : 'border-primary text-primary'}`}
                  onClick={() => setActivePage(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default News;
