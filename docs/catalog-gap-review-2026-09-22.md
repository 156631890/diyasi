# 公司网站产品查漏补缺 — 2026-09-22

核对范围为 `yiwudiyasidress.com` 当前45款，以及公司另外两个网站的公开英文产品目录、分页、产品sitemap和详情。没有发现可确认、资料足够且可以直接新增的独立型号。实际需要补充的是产品资料和源站内容一致性，不能把重复URL或错误标题当成新品。

## 逐项覆盖结果

| 来源 | 产品详情URL | 可对应的独立型号 | 现站覆盖 | 本轮可新增 |
| --- | ---: | ---: | ---: | ---: |
| diyasiunderwear.com | 46 | 45 | 45 | 0 |
| diyasiapparel.com | 43 | 42 | 42 | 0 |

两站共89个产品详情页，已逐页读取。Underwear目录遍历4个分页；Apparel目录和product-sitemap相互核对，sitemap中的图片URL及`/shop/`没有算成商品。Apparel的42个型号是现站45款的子集，差异是未列出LS005、LS005-142、LS006三款蕾丝产品。

- Underwear的LS005有两个来源页面，主图SHA256完全相同，现站早已合并到同一产品。
- Apparel的DYS218有正常页和带`test`的测试页。测试页正文明确写DYS218，两个封面文件虽然URL不同，SHA256完全相同，因此也属于重复。
- 当前45款按主系列分为棉款19、无痕款7、蕾丝款3、男款16。女款、高腰、丁字裤等展示分类会复用这些商品，不能把分类数量相加当成产品总量。
- 当前45款均有主图、图库、材料说明、尺寸范围、颜色、MOQ说明及尺码参考图字段。字段存在不代表商业规格已经充分；例如男款成分缺少百分比。

证据与可交付表格：

- [89个来源页面逐项对照CSV](catalog-source-comparison-2026-09-22.csv)：来源URL/标题/型号、对应现站URL、材料/MOQ原文和异常说明。
- [完整来源审计JSON](catalog-gap-source-audit-2026-09-22.json)：公开规格、图库链接、页面文本及映射依据。
- [16款男装待补资料CSV](product-data-gaps-2026-09-22.csv)：可交给工厂补充身体面料和袋位/底裆的精确成分比例。

## 找到的源站冲突

这些问题位于Apparel源站，已记录但没有直接修改该站后台。现站没有按这些冲突标题再建重复产品。

| 型号 | 观察到的冲突 | 处理 |
| --- | --- | --- |
| DYS208 | 来源网址写DYS206，详情表写DYS208；Description另有lace措辞 | 以详情型号映射现有DYS208，规格/图片进一步确认前不当新品 |
| DYS322 | 标题、描述写高腰全包，型号和图像文件为DYS322，另一官方站对应低腰bonded thong | 保留现站DYS322，建议源站运营修正文案 |
| DYS202 | Apparel标题写mid-rise thong，另一站与现站为bikini | 标记跨站命名冲突，不能以名称差异增加一个同型号产品 |
| DYS204 | 标题和描述写microfiber，材料表为95%棉/5%氨纶 | 以现有材料表说明为准，不新增所谓另一款超细纤维产品 |
| DYS218 | 多一个公开test页面 | 型号及相同封面字节证明重复，不导入 |

这类错误说明仅比较标题会高估可导入产品数量。按型号映射也不能证明每个定制版本都相同；上述冲突应由工厂和源站编辑最终统一。

## 已实际补齐的现站资料

M005的原MOQ仅写“Confirm quantity for the selected fabric and branding”。本轮读取Apparel该型号规格表，明确为120 pcs；Underwear同型号价格参考行也写基于MOQ120pcs，其MOQ栏则强调灵活数量。已据此补为：

> Catalogue reference: 120 pieces per style; confirm mixed sizes, colors and custom-component minimums for your order

材料说明同时统一为polyester/spandex身体面料与modal袋位/底裆；再生聚酯明确为需要订单资料支持的选项。加入第二公司网站的来源记录，M005资料核对日期及目录更新日期设为2026-09-22。未新增公开价格或Product/Offer结构化数据。

只有M005产品记录发生变化，另外44款的URL、图片、规格和内容全部保留；来源引用总数从46增至47。现站仍为45款、6篇News、91个sitemap网址。

## 真正还缺的资料

1. **16款男装的精确材料百分比**：两个网站均主要写polyester/spandex和modal，缺少完整配比，不能自行填成常见比例。对应型号已列入CSV。
2. **新增系列的独立商品资料**：Underwear的Sportswear & Seamless、Eco Essentials Line、Eco Package Showcase三个公开分类在本轮检查时均未列出产品。不能仅凭导航分类或首页宣传创建文胸、运动内衣等商品。
3. **如有未公开新品**：需要型号、正背面与细节图、身体和底裆材料、尺寸表、起订及定制条件；有这些信息才能安全扩充。公开目录审计无法判断工厂未上线的私人产品册。

本轮未联系第三方、未发送邮件，也未修改公司另外两个网站。没有为凑数量创建颜色重复页、测试页或缺规格的空商品页。

## 验证与发布

- 相关既有测试8/8通过，覆盖现有目录唯一性、sitemap、分页发现、查询和样品清单。原断言将全部引用固定为46，现调整为保留原Underwear站46个引用的覆盖要求，允许第二公司站补充依据。
- 内容脚本确认仅M005变化、总商品数45不变；diff-check通过。
- Vercel生产构建和TypeScript通过，生产部署 `dpl_5c85PpQDcRXY3L2G3NzTpDaC1YXV`（2026-09-22 15:44:18中国时间）为Ready；正式www、裸域和原Vercel aliases均由inspect确认。部署URL：https://diyasi-5df6fb03n-stevens-projects-08c9c5b0.vercel.app 。前一版本为 `dpl_6mez9nNKvYUP1vxaLi3TGUkB34q7`。
- [上线检查](catalog-gap-live-check-2026-09-22.json)确认M005 HTTP200，新MOQ及材料说明已实际输出；继续使用ItemPage和BreadcrumbList，未恢复Product；sitemap仍为91且覆盖45款商品。一次内联检查命令因PowerShell引号转义失败，改成独立Python脚本后通过，未发现线上页面错误。

工作区 `C:\Users\Administrator\diyasi`，分支 `feat/diyasi-redesign-20260917`，HEAD `0425f2d7cca564ada472324a2564f2f8c0365311`。保留既有未提交工作，无commit/push。一次性脚本`.tmp/finalize_catalog_gap.py`已经执行，不可重复运行；`.tmp/reconcile_catalog.py`的缓存为本轮新建。
