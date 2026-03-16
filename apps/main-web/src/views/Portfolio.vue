<script setup lang="tsx">
import { Medal, School, User } from '@element-plus/icons-vue';
import { usePortfolio } from './portfolio';

const { portfolioData } = usePortfolio();

const renderWithStrong = (content: string, strong?: string[]) => {
  if (!strong || strong.length === 0) {
    return content;
  }
  const textList = content.split(
    new RegExp(`(${strong.join('|')})`.replace(/\+/g, '\\+')),
  );
  return textList.map((text) => {
    if (strong.includes(text)) {
      return (
        <strong class="mx-0.5 text-zinc-700 dark:text-zinc-200" key={text}>
          {text}
        </strong>
      );
    }
    return <span key={text}>{text}</span>;
  });
};
const StrongText = (props: { content: string; strong?: string[] }) => {
  return renderWithStrong(props.content, props.strong);
};
</script>

<template>
  <article
    class="relative mx-auto max-w-4xl space-y-3 border border-zinc-200 bg-zinc-50 p-10 pt-6 text-zinc-800 transition-all animate-in fade-in md:p-16 md:pt-10 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
  >
    <div
      class="not-print absolute top-0 left-0 h-1 w-full bg-linear-to-r from-indigo-600 via-violet-600 to-cyan-600"
    ></div>
    <header id="basic-info" class="space-y-2">
      <h1 class="text-4xl font-black tracking-widest">
        <span>{{ portfolioData.name }}</span>
        <span class="ml-6 text-base tracking-widest">
          <span>求职意向: </span>
          <span class="text-indigo-700 dark:text-indigo-400">{{
            portfolioData.jobIntention
          }}</span>
        </span>
      </h1>
      <div class="flex items-center gap-x-2 text-sm font-medium text-zinc-500">
        <ElIcon class="text-indigo-700! dark:text-indigo-300!"><User /></ElIcon>
        <span>{{ portfolioData.birth }}</span>
        <span>|</span>
        <span>{{ portfolioData.phone }}</span>
        <span>|</span>
        <span>{{ portfolioData.email }}</span>
      </div>
      <div class="flex items-center gap-x-2 text-sm font-medium text-zinc-500">
        <ElIcon class="text-indigo-700! dark:text-indigo-300!"
          ><School
        /></ElIcon>
        <span>{{ portfolioData.education.school }}</span>
        <span>|</span>
        <span>{{ portfolioData.education.degree }}</span>
        <span>|</span>
        <span>{{ portfolioData.education.period.join(' - ') }}</span>
      </div>
      <div class="flex flex-wrap gap-x-2 gap-y-1">
        <div
          v-for="item in portfolioData.certificates"
          :key="item"
          class="flex items-center gap-x-1 rounded-full border border-zinc-200/80 bg-zinc-100/80 px-3 py-0.5 text-xs font-medium text-zinc-700 dark:border-zinc-800/80 dark:bg-zinc-900/80 dark:text-zinc-300"
        >
          <ElIcon class="text-amber-600! dark:text-amber-400!"
            ><Medal
          /></ElIcon>
          <span>{{ item }}</span>
        </div>
      </div>
    </header>
    <section id="career-summary" class="space-y-2">
      <h2
        class="relative flex items-center border-l-4 border-zinc-900 pl-3 text-lg font-black tracking-wider dark:border-zinc-300"
      >
        <span>职业总结</span>
        <div
          class="w-half w-80% absolute right-0 h-1 w-[calc(100%-8rem)] skew-x-60 bg-zinc-800 dark:bg-zinc-400"
        ></div>
      </h2>
      <ul
        class="space-y-1 text-sm leading-relaxed font-medium text-zinc-600 dark:text-zinc-400"
      >
        <li v-for="item in portfolioData.careerSummary" :key="item.content">
          <span>• </span>
          <StrongText :content="item.content" :strong="item.strong" />
        </li>
      </ul>
    </section>
    <section id="core-skills" class="space-y-2">
      <h2
        class="relative flex items-center border-l-4 border-zinc-800 pl-3 text-lg font-black tracking-wider dark:border-zinc-300"
      >
        <span>核心技能</span>
        <div
          class="w-half w-80% absolute right-0 h-1 w-[calc(100%-8rem)] skew-x-60 bg-zinc-800 dark:bg-zinc-400"
        ></div>
      </h2>
      <ul
        class="space-y-1 text-sm leading-relaxed font-medium text-zinc-600 dark:text-zinc-400"
      >
        <li v-for="item in portfolioData.coreSkills" :key="item.label">
          <span>• </span>
          <span class="font-bold text-slate-600 uppercase dark:text-slate-400"
            >{{ item.label }}:
          </span>
          <span class="ml-1 inline-flex items-center space-x-1 md:ml-1">
            <span
              v-for="tag in item.content.split(', ')"
              :key="tag"
              class="rounded-full border border-zinc-200/80 bg-zinc-100/80 px-4 py-0.5 text-xs text-nowrap dark:border-zinc-800/80 dark:bg-zinc-900/80"
            >
              {{ tag }}
            </span>
          </span>
        </li>
      </ul>
    </section>
    <section id="work-experiences" class="space-y-2">
      <h2
        class="relative flex items-center border-l-4 border-zinc-800 pl-3 text-lg font-black tracking-wider dark:border-zinc-300"
      >
        <span>工作经历</span>
        <div
          class="w-half w-80% absolute right-0 h-1 w-[calc(100%-8rem)] skew-x-60 bg-zinc-800 dark:bg-zinc-400"
        ></div>
      </h2>
      <div class="space-y-2">
        <div
          v-for="item in portfolioData.workExperiences"
          :key="item.company"
          class="space-y-1"
        >
          <div
            class="grid grid-cols-4 justify-between text-sm font-bold text-zinc-800 md:flex-row md:items-center dark:text-zinc-200"
          >
            <span class="text-zinc-500 dark:text-zinc-400">{{
              item.period.join(' - ')
            }}</span>
            <span>{{ item.company }}</span>
            <span>{{ item.remark }}</span>
            <span class="text-end text-indigo-600 dark:text-indigo-400">{{
              item.role
            }}</span>
          </div>
          <ul
            class="text-xs leading-relaxed font-medium text-zinc-600 dark:text-zinc-400"
          >
            <li
              v-for="[pName, pContent, pStrong] in (item.points as [string, string, string[]][])"
              :key="pName"
            >
              <span>• </span>
              <template v-if="pContent && pName">
                <span>{{ pName }}</span>
                <span>: </span>
              </template>
              <span
                ><StrongText :content="pContent || pName" :strong="pStrong"
              /></span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </article>
</template>

<style lang="scss" scoped></style>
