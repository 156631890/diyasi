# 正式发布与索引核验结果

日期：2026-10-31（Asia/Shanghai）。

## 已发布

- 正式域名：https://www.yiwudiyasidress.com
- 部署：`dpl_Eo4ueAHHfjcu3EhdS1PmRHjhD7cK`
- 部署地址：`https://diyasi-mbf54ipnq-stevens-projects-08c9c5b0.vercel.app`
- 已发布源码提交：`467a78b`，分支 `seo/diyasi-growth-20261031`。
- 本部署通过 CLI 从隔离 worktree 上传；Vercel 元数据未显示 Git SHA，因此上述 SHA 是本地发布记录，并非伪称平台返回的字段。部署时应用代码已提交，后续改动仅补充验收文档。
- 正式环境构建成功，先以 `--prod --skip-domain` 建立，再验证英文采购页、法语页和 sitemap，之后 promote。正式域名查询已指向该部署。
- 回滚目标：`dpl_F8NkAUutFd71j9Si1W3mX2Hvj131`。

## 线上验证

| 检查 | 结果 |
| --- | --- |
| sitemap | 193 个规范页面 |
| JSON-LD | 892 段可解析，0 错误 |
| FAQ 与可见正文 | 304 条通过 |
| 内链检查 | 275 个地址，死链 0 |
| 12 个采购页 | 入链来源均 ≥5，首页点击深度均 ≤2 |
| hreflang | 互惠检查 0 错误 |
| 原 3 个资源 URL | 全部 301 到对应采购页 |
| 首页、法语采购页、成本指南抽查 | HTTP 200、单一 H1、index/follow、自身 canonical |
| robots | sitemap 声明正确，未屏蔽静态资源，私有流程排除保留 |
| 浏览器 | 正式域名显示新采购索引；桌面/手机主要模板通过，手机语言菜单及语言标记修复已复核 |

完整报告在 `production/jsonld.json`、`production/internal-links.json`、`production/smoke.json`。

## Search Console 的真实情况

读取属性：`https://www.yiwudiyasidress.com/`，报告最后更新：2026-10-23。报告显示已编入索引 44，未编入索引 191：

| 原因 | 页数 |
| --- | ---: |
| 已发现但尚未编入索引 | 106 |
| noindex 排除 | 31 |
| robots 屏蔽 | 19 |
| 404 | 17 |
| 已抓取但尚未编入索引 | 11 |
| 重定向 | 4 |
| 备用规范页 | 3 |

逐一提取并请求了全部 31 个 noindex 示例。它们全部是旧 `/products/DYS-数字` 地址，报告中的上次抓取日期为 2026 年 7–9 月；2026-10-31 当前实际均返回 404。已比对仓库旧 `data/alibaba-products.json` 与当前审核目录 `apps/web/data/catalog.json`：没有同源商品 ID 的精确对应。旧条目含运动服、塑身衣、文胸及旧内裤条目，不能凭相似名称映射到现有 45 款商品。

处理决定：保留这些旧条目的 404 与 sitemap 排除，不创建无依据的同款关系、不恢复旧批量资料为在售商品、不将它们全部重定向首页。当前商品目录在生产基线中已采用审核后的数据源，本轮没有删除这 31 页。详细逐条结果见 `gsc-noindex-recheck.json`。

因此本轮没有把“Google 报告中的 191 个未索引地址”声称为全部已收录。当前公开规范页面的技术检查通过；旧报告状态、Google 重新抓取、收录和实际流量变化仍需观察。未操作 Search Console 请求收录或 sitemap 提交，按附件人工操作范围保留在 `docs/seo-rollout.md` 中。

## 其他电商站点检查

读取各站首页、robots、sitemap，并按子 sitemap 抽样首尾或类别页面。以下数字是 sitemap 条目数与公开页面样本，不是 Google 收录数；没有更改这些站点。

| 站点 | sitemap 条目 | 页面样本 | 样本结果 |
| --- | ---: | ---: | --- |
| kuangtueyewear.com | 2,092 | 19 | HTTP 正常，无 noindex，有 canonical，单一 H1 |
| kuangtuhandbags.com | 2,449 | 9 | HTTP 正常，无 noindex，有 canonical，单一 H1 |
| elosung.cn | 19,947 | 73 | HTTP 正常，无 noindex，有 canonical，单一 H1 |
| cupnora.com | 1,562 | 24 | HTTP 正常，无 noindex，有 canonical，单一 H1 |

共 125 个页面样本。未执行这些站点的全 URL 抓取或 Search Console 逐页诊断，不能推断所有 URL 都已收录。原始证据见 `other-commerce-sites.json` 与 `other-commerce-samples.json`。

## 后续需要真实输入的事项

报价梯度、有效认证与适用范围、文胸/塑身衣/泳装生产证据、品类实拍仍待补；页面已按用户答复明确待确认，没有发布虚构事实。Google Rich Results Test 的 3 页人工检查和分批请求收录未冒充完成。依赖未变更；云端安装日志报告现有依赖的审计告警，未在本次 SEO 工作中自动升级依赖或执行强制修复。
