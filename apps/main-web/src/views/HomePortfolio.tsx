import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { ElIcon } from 'element-plus';
import {
  Connection,
  Sunny,
  Moon,
  Promotion,
  CircleCheckFilled,
  Link,
  Files,
  User,
  Aim,
  Lightning,
  Trophy,
  Reading,
  Location,
  TopRight,
  MagicStick,
  Calendar,
  CircleCheck,
  Message,
  Phone,
  Grid,
  Operation,
  ArrowRight,
  Iphone,
} from '@element-plus/icons-vue';

export default defineComponent({
  name: 'HomePortfolio',
  setup() {
    return () => {
      // 核心技能数据
      const skillGroups = [
        {
          category: 'Web 前端开发',
          icon: (
            <ElIcon class="block h-5 w-5">
              <Grid />
            </ElIcon>
          ),
          skills: [
            'Vue 3 (Composition API)',
            'TypeScript',
            'Pinia',
            'JavaScript (ES6+)',
            'Element-Plus',
          ],
        },
        {
          category: '游戏研发与策划',
          icon: (
            <ElIcon class="block h-5 w-5">
              <Connection />
            </ElIcon>
          ),
          skills: [
            'Godot Engine 4.x',
            'GDScript',
            'C++',
            '程序化生成',
            '数值平衡',
          ],
        },
        {
          category: '工程化与工具',
          icon: (
            <ElIcon class="block h-5 w-5">
              <Operation />
            </ElIcon>
          ),
          skills: ['Git', 'CI/CD', 'Shell', '开发者测试 (DT)', 'E2E 测试'],
        },
        {
          category: '架构与性能优化',
          icon: (
            <ElIcon class="block h-5 w-5">
              <Files />
            </ElIcon>
          ),
          skills: [
            'PDM 电子流组件',
            '异步加载',
            '虚拟滚动',
            '低代码改造',
            '重构',
          ],
        },
      ];

      const experiences = [
        {
          id: 1,
          period: '2021.09 - 2023.10',
          company: '华为成都研究所',
          role: '前端工程师 (Committer)',
          location: '成都',
          description:
            '负责组内重点电子流开发及前端架构看护。作为 Committer，对 30W+ 行代码进行质量把关与整改。',
          highlights: [
            '主导移动审批模板从 Vue 2 升级至 Vue 3 + Pinia，降低重复代码约 60%。',
            '参与电子流低代码项目核心改造，解决微服务上云适配及安全拦截难题。',
            '累计产出 300+ 检视意见，制定并推行前端技术标准。',
          ],
          tags: ['Vue 3', '架构升级', '代码评审', '大型项目'],
        },
        {
          id: 2,
          period: '2023.10 - 至今',
          company: 'ZYI Game 工作室',
          role: '游戏策划 / 开发 / 测试',
          location: '远程 (创业)',
          description:
            '独立投身于游戏研发领域，负责双人联机 Roguelike 游戏的从 0 到 1 交付。',
          highlights: [
            '独立开发类幸存者肉鸽游戏《猎虫者契约》，负责策划、程序、美术及数值。',
            '基于 Godot 4.x 构建战斗逻辑，实现高性能资产异步加载与双人联机框架。',
            '具备完整的软件著作权申请与项目管理经验。',
          ],
          tags: ['Godot', 'GDScript', '全栈研发', '数值策划'],
        },
        {
          id: 3,
          period: '2021.01 - 2021.08',
          company: '华为杭州研究所',
          role: '前端工程师',
          location: '杭州',
          description: '负责运维客服系统维护，主导分析系统前端搭建。',
          highlights: [
            '独立完成嵌入式软件性能分析系统 Fast 前端搭建、开发与现场部署。',
            '支撑业务部门解决生产环境性能瓶颈。',
          ],
          tags: ['性能分析', '系统搭建', '现场部署'],
        },
        {
          id: 4,
          period: '2019.08 - 2020.09',
          company: '成都铭瑞思科技',
          role: '软件研发工程师',
          location: '成都',
          description: '创业团队核心成员，主导全链路业务系统研发。',
          highlights: [
            '负责海华财务 CRM 系统架构设计、前后端编码及服务器生产环境搭建。',
            '在资源有限的环境下实现高效交付与系统稳定运行。',
          ],
          tags: ['全栈', 'CRM 系统', '快速迭代'],
        },
      ];

      return (
        <main class="mx-auto max-w-5xl space-y-32 px-6 pt-32 pb-20">
          {/* Hero Section */}
          <section class="animate-in fade-in slide-in-from-bottom-4 relative space-y-8 duration-1000">
            <div class="absolute -top-24 -left-12 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/5"></div>

            <div class="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-[10px] font-black tracking-widest text-indigo-600 uppercase dark:border-zinc-800 dark:bg-zinc-900 dark:text-indigo-400">
              <ElIcon class="mr-1.5 h-3 w-3">
                <MagicStick />
              </ElIcon>{' '}
              6 年研发经验 / 前端 Committer / 独立游戏人
            </div>

            <h1 class="text-5xl leading-[1.1] font-black tracking-tighter md:text-7xl">
              杨杰. <br />
              <span class="text-zinc-400">前端开发工程师</span> <br />
              <span class="bg-linear-to-r from-indigo-500 to-emerald-400 bg-clip-text text-transparent">
                软件架构创作者.
              </span>
            </h1>

            <p class="max-w-2xl text-lg leading-relaxed font-medium text-zinc-500 dark:text-zinc-400">
              深耕
              <span class="text-zinc-900 dark:text-zinc-100">
                {' '}
                Vue 3 / TypeScript / C++{' '}
              </span>
              技术栈。 曾在华为负责 30W+ 行规模的工程化看护与架构重构，亦有从 0
              到 1 独立研发、策划并交付联机游戏的成功经验。
              信奉“工具化”哲学，热衷于通过自动化流程消除重复劳动。
            </p>

            <div class="flex flex-wrap gap-4 pt-4">
              <div class="flex items-center space-x-2 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-bold text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
                <ElIcon class="h-4 w-4">
                  <CircleCheckFilled />
                </ElIcon>
                <span>华为 JS 专业级可信证书</span>
              </div>
              <div class="flex items-center space-x-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                <ElIcon class="h-4 w-4">
                  <Link />
                </ElIcon>
                <span>软著：猎虫者契约</span>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="经历" class="space-y-12">
            <div class="flex flex-col space-y-2">
              <span class="text-xs font-black tracking-widest text-indigo-600 uppercase">
                Career
              </span>
              <h2 class="text-3xl font-black tracking-tighter">职业足迹</h2>
            </div>

            <div class="grid gap-6">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  class="group relative rounded-3xl border border-zinc-200 bg-zinc-50 p-8 transition-all hover:border-indigo-500 dark:border-zinc-800 dark:bg-zinc-900/50"
                >
                  <div class="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div class="space-y-1">
                      <h3 class="flex items-center text-xl font-black tracking-tight">
                        {exp.company}
                        <span class="ml-3 rounded-md bg-indigo-100 px-2 py-0.5 text-[10px] font-black tracking-tighter text-indigo-600 uppercase dark:bg-indigo-500/20 dark:text-indigo-400">
                          {exp.location}
                        </span>
                      </h3>
                      <p class="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                        {exp.role}
                      </p>
                    </div>
                    <div class="font-mono text-sm font-black tracking-tighter text-zinc-400 dark:text-zinc-600">
                      {exp.period}
                    </div>
                  </div>

                  <p class="mb-6 text-sm leading-relaxed font-medium text-zinc-600 dark:text-zinc-400">
                    {exp.description}
                  </p>

                  <ul class="mb-8 space-y-3">
                    {exp.highlights.map((h, i) => (
                      <li
                        key={i}
                        class="flex items-start text-xs leading-relaxed text-zinc-500 dark:text-zinc-400"
                      >
                        <ElIcon class="mt-0.5 mr-2 h-3 w-3 shrink-0 text-indigo-500">
                          <ArrowRight />
                        </ElIcon>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div class="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        class="rounded-lg border border-zinc-200 bg-white px-2 py-1 text-[10px] font-bold uppercase dark:border-zinc-700 dark:bg-zinc-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section id="技能" class="space-y-12">
            <div class="flex flex-col space-y-2">
              <span class="text-xs font-black tracking-widest text-indigo-600 uppercase">
                Stacks
              </span>
              <h2 class="text-3xl font-black tracking-tighter">技术矩阵</h2>
            </div>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              {skillGroups.map((group, idx) => (
                <div
                  key={idx}
                  class="flex flex-col space-y-6 rounded-3xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900/50"
                >
                  <div class="flex items-center space-x-4">
                    <div class="rounded-2xl bg-white p-3 text-indigo-600 shadow-sm dark:bg-zinc-800">
                      {group.icon}
                    </div>
                    <h4 class="font-black tracking-tight">{group.category}</h4>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    {group.skills.map((s) => (
                      <span
                        key={s}
                        class="rounded-lg border border-zinc-200 bg-white px-3 py-1 text-xs font-medium dark:border-zinc-700 dark:bg-zinc-800"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section class="group relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-[3rem] bg-indigo-600 p-12 text-white md:flex-row dark:bg-indigo-500">
            <div class="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl transition-transform duration-700 group-hover:scale-125"></div>
            <div class="relative z-10 space-y-4 text-center md:text-left">
              <div class="flex items-center justify-center space-x-3 opacity-80 md:justify-start">
                <ElIcon class="h-5 w-5">
                  <Reading />
                </ElIcon>
                <span class="text-xs font-black tracking-widest uppercase">
                  Education
                </span>
              </div>
              <h2 class="text-4xl font-black tracking-tighter">成都理工大学</h2>
              <p class="font-bold text-indigo-100">
                软件工程 · 统招本科 (2015 - 2019)
              </p>
            </div>
            <div class="relative z-10 flex flex-col items-center space-y-2 md:items-end">
              <div class="rounded-full bg-white/20 px-3 py-1 text-[10px] font-black tracking-widest uppercase">
                Bachelor of Engineering
              </div>
              <div class="flex space-x-4 pt-2">
                <div class="text-center">
                  <div class="text-2xl leading-none font-black">CET-6</div>
                  <div class="text-[10px] font-bold uppercase opacity-60">
                    英语等级
                  </div>
                </div>
                <div class="h-8 w-px bg-white/20"></div>
                <div class="text-center">
                  <div class="text-2xl leading-none font-black">NCRE-2</div>
                  <div class="text-[10px] font-bold uppercase opacity-60">
                    计算机二级
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section
            id="联系"
            class="border-t border-zinc-200 pt-20 dark:border-zinc-800"
          >
            <div class="grid gap-12 md:grid-cols-2">
              <div class="space-y-6">
                <h3 class="tracking-tighte space-x-4r flex space-x-4 text-4xl font-black">
                  <span>联系方式</span>
                  <span>
                    <a
                      href="mailto:maple_frost@foxmail.com"
                      class="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-white transition-transform hover:scale-110 dark:bg-white dark:text-zinc-900"
                    >
                      <ElIcon class="h-5 w-5">
                        <Message />
                      </ElIcon>
                    </a>
                  </span>
                </h3>
                <p class="max-w-sm font-medium text-zinc-500 dark:text-zinc-400">
                  我正在寻求前端开发或软件开发相关岗位，欢迎随时联系。
                </p>
              </div>

              <div class="space-y-6 rounded-3xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900/50">
                <div class="flex items-center space-x-4">
                  <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white">
                    <ElIcon class="h-6 w-6">
                      <Iphone />
                    </ElIcon>
                  </div>
                  <div>
                    <div class="text-[10px] font-black tracking-widest text-zinc-400 uppercase">
                      Phone
                    </div>
                    <div class="text-lg font-black">177 8100 9354</div>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-white">
                    <ElIcon class="h-6 w-6">
                      <Message />
                    </ElIcon>
                  </div>
                  <div>
                    <div class="text-[10px] font-black tracking-widest text-zinc-400 uppercase">
                      Email
                    </div>
                    <div class="text-lg font-black tracking-tight">
                      maple_frost@foxmail.com
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <footer class="mt-32 flex flex-col items-center justify-between space-y-4 text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase md:flex-row md:space-y-0">
              <div class="flex items-center space-x-4">
                <span>© 2024 杨杰</span>
                <span class="h-1 w-1 rounded-full bg-zinc-400"></span>
                <span>YANG JIE</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></div>
                <span>Open for new opportunities</span>
              </div>
              <div>Built with Vue 3 & Element Plus</div>
            </footer>
          </section>
        </main>
      );
    };
  },
});
