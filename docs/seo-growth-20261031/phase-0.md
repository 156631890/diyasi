# Phase 0 · 2026-10-31 仓库体检

生产基线：3df2c20be15acb935c0b7963341f735c4b5b4f7d；部署 dpl_F8NkAUutFd71j9Si1W3mX2Hvj131。独立工作树，未混入旧目录改动。

## 路由树

| 文件 | 路由 |
|---|---|
| `app\about\page.tsx` | `/about` |
| `app\admin\page.tsx` | `/admin` |
| `app\api\conversions\route.ts` | `/api/conversions` |
| `app\api\inquiries\route.ts` | `/api/inquiries` |
| `app\api\payments\checkout\route.ts` | `/api/payments/checkout` |
| `app\api\payments\paypal\capture-order\route.ts` | `/api/payments/paypal/capture-order` |
| `app\api\payments\paypal\config\route.ts` | `/api/payments/paypal/config` |
| `app\api\payments\paypal\create-order\route.ts` | `/api/payments/paypal/create-order` |
| `app\blog\[slug]\page.tsx` | `/blog/[slug]` |
| `app\blog\page.tsx` | `/blog` |
| `app\checkout\cancel\page.tsx` | `/checkout/cancel` |
| `app\checkout\mock\page.tsx` | `/checkout/mock` |
| `app\checkout\paypal\page.tsx` | `/checkout/paypal` |
| `app\checkout\success\page.tsx` | `/checkout/success` |
| `app\contact\page.tsx` | `/contact` |
| `app\design-preview\page.tsx` | `/design-preview` |
| `app\es\[...slug]\page.tsx` | `/es/[slug]` |
| `app\es\page.tsx` | `/es` |
| `app\fabrics\page.tsx` | `/fabrics` |
| `app\factory\page.tsx` | `/factory` |
| `app\indexnow-key.txt\route.ts` | `/indexnow-keytxt` |
| `app\llms.txt\route.ts` | `/llmstxt` |
| `app\news\[slug]\page.tsx` | `/news/[slug]` |
| `app\news\page.tsx` | `/news` |
| `app\oem-odm\page.tsx` | `/oem-odm` |
| `app\packaging\page.tsx` | `/packaging` |
| `app\page.tsx` | `/` |
| `app\payments\page.tsx` | `/payments` |
| `app\privacy-policy\page.tsx` | `/privacy-policy` |
| `app\products\[productId]\page.tsx` | `/products/[productId]` |
| `app\products\page.tsx` | `/products` |
| `app\resources\[slug]\page.tsx` | `/resources/[slug]` |
| `app\resources\page.tsx` | `/resources` |
| `app\return-policy\page.tsx` | `/return-policy` |
| `app\robots.ts` | `/` |
| `app\sitemap.ts` | `/` |
| `app\sustainability\page.tsx` | `/sustainability` |

## 结构与索引

| 项目 | 发现 |
|---|---|
| 数据 | data/resource-articles.json 24 篇；data/news-articles.json 46 篇；catalog.json 45 个商品 |
| Resources schema | slug/title/category/publishedAt/updatedAt/desc/models/answer/sections{title,text,rows?}/faq/references |
| News schema | slug/title/description/category/publishedAt/updatedAt/cover*/models/intro/sections{title,paragraphs,rows?}/reading/references?/faq? |
| 西语 | app/es/page.tsx 与 [...slug]，localized-pages.ts 数据；proxy.ts x-site-locale；locale-routes.ts 双向映射，buildMetadata 每页输出 |
| 导航 | components/TopNav.tsx：集合、oem-odm、factory、news；手机版另有resources/contact |
| 集合链接 | products、womens-panties、cotton-underwear、lace-underwear、seamless-underwear、thongs、high-waist、mens-underwear |
| Footer | SiteFooter.tsx：上述集合+oem-odm/fabrics/packaging/factory/resources/about/news/sustainability/contact/privacy-policy/return-policy；外链关联工厂站、LinkedIn、Facebook |
| JSON-LD | layout WebSite/Organization；首页FAQ；资源Article/FAQ/Breadcrumb；News Article或NewsArticle/Breadcrumb；商品ItemPage/Breadcrumb；集合CollectionPage/ItemList/Breadcrumb；公司页Breadcrumb/部分FAQ；es WebPage/FAQ/Breadcrumb；contact LocalBusiness；blog Article/Breadcrumb |
| Sitemap | app/sitemap.ts从lib/indexable-content.ts动态生成；日期存在批量覆盖产品reviewedAt |
| canonical | buildMetadata通过URL()根路径带/；layout默认无/；非根路径基本无尾斜杠。根URL两形式等价，但信号需要统一。组织ID保持/#organization |

## 内耗清单

| 现有资源页 | 标题 | 与目标关系 |
|---|---|---|
| /resources/120-pcs-moq-underwear-manufacturer | 120 pcs MOQ Underwear Manufacturer: How Each Style Works | 按附件301迁移到采购集群 |
| /resources/private-label-underwear-manufacturer | Private Label Underwear: Logo & Packaging Guide | 按附件301迁移到采购集群 |
| /resources/custom-waistband-underwear-manufacturer | Custom Waistband Underwear Manufacturer: Logo Methods | 保留深度采购意图，加相关服务内链 |
| /resources/laser-cut-underwear-manufacturer | Laser Cut Underwear Manufacturer: Seamless OEM Checks | 保留深度采购意图，加相关服务内链 |
| /resources/underwear-manufacturer-for-startup-brands | Underwear Manufacturer for Startup Brands: First Order | 保留深度采购意图，加相关服务内链 |
| /resources/mens-underwear-manufacturer-private-label | Men’s Underwear Manufacturers: Private-Label Buying Guide | 按附件301迁移到采购集群 |
| /resources/yiwu-underwear-manufacturer | Yiwu Underwear Manufacturer: A Sourcing Verification Guide | 保留地域意图，链接hub，不301 |
| /resources/high-waisted-briefs-manufacturer | High Waisted Briefs Manufacturer: Coverage and OEM Fit | 保留深度采购意图，加相关服务内链 |
| /resources/private-label-underwear-moq-guide | Underwear MOQ Explained: Styles, Colors and Labels | 保留深度采购意图，加相关服务内链 |
| /resources/lace-underwear-oem-guide-boutique-lingerie-brands | Private Label Lace Underwear OEM Guide: Fabric and Fit | 保留深度采购意图，加相关服务内链 |
| /resources/cotton-underwear-oem-guide-daily-basics-startups | Private Label Cotton Underwear Sampling Guide | 保留深度采购意图，加相关服务内链 |
| /resources/underwear-sampling-costs-lead-times-packaging | How to Request Underwear Samples from Factory Teams | 保留深度采购意图，加相关服务内链 |

还需区分oem-odm既有私标总流程与新私标服务页、产品Seamless/Lace分类与新采购服务页。Phase 6新增cost/MOQ指南与已有Resources重叠，采用总览与详细计算/订单规则分工、显式交叉链接，不额外删除或重定向。

## 事实与执行解释

沿用已发布的120件/款、5–7天打样指引（按brief确认）、20–35天量产参考及型号级成分尺码。没有公开阶梯价/gsm/证书编号；TODO仅写内部清单，前台隐藏无依据报价模块。用户明确允许未知品类能力写待确认。

Phase6表格为6个新guides+1个既有seamless页深化，加/guides索引共7个新路由。Phase7选择es 4采购+3指南，fr/de/it各8采购页，不扩阿拉伯语或俄语。

用户当前要求完成并上线，因此先呈报Phase0后持续实施；按phase独立commit/build。人工逐页Rich Results抽查、真实工厂素材/未公开事实及未来分批GSC操作留在交付清单；不伪造人工审核与实际流量结果。
