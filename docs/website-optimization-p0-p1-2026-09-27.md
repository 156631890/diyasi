# yiwudiyasidress.com 采购与询盘优化核验（工作分支）

日期：2026-09-27。仓库 `C:\Users\Administrator\diyasi`，分支 `feat/diyasi-redesign-20260917`，基线 HEAD `0425f2d7cca564ada472324a2564f2f8c0365311`。`.vercel/project.json` 指向 `diyasi-web`；代码中的 `SITE_ORIGIN` 为 `https://www.yiwudiyasidress.com`。原有未提交工作保留。本轮没有提交、合并、推送或部署生产，也没有修改其他 DIYASI 网站。

用户指定的 `DIYASI_Codex_website_optimization.md` 在仓库、当前用户目录、已连接 Google Drive 和 GitHub 文件搜索中均未找到。现有的 `yiwudiyasidress网站改版方案.md` 是另一份旧方案，不能代替指定文件。以下按本轮用户消息执行；收到指定文件后仍需逐项对照。

## P0 目录、MOQ 和链接

- 当前 `apps/web/data/catalog.json` 有 **45 个独立型号**。既有源站逐页比对在 `docs/catalog-gap-review-2026-09-22.md`：一个源站 46 个 URL 中有重复型号，另一公司站的 42 个型号是当前目录子集。旧方案中的“300 款”没有可核实的当前产品数据，未虚构或批量发布。
- 多数当前目录型号的源资料列 120 件/款；所有者提供的公司介绍说部分小批量定制可从 100 件/款评估。它们按“现有目录款”和“具体定制方案”区分，报价时确认。旧 500 件贴牌兜底文案与表单示例已撤下；未使用的旧 API 种子商品常量（含 300/500 件及旧交期）已移除，实际种子继续读取经审查的现目录。没有把全站 MOQ 改为同一个数字。
- 现有 45 个型号 URL 未改名。当天本地 `/sitemap.xml` 共 133 个 URL，其中 `/products/` 下 54 个 URL = 45 个产品详情 + 9 个产品分类；`robots.txt` 声明目标域名 sitemap，未屏蔽产品详情。四个代表产品的 canonical 与 sitemap URL 一致；无须新增重定向。

## P0 询盘闭环

- 样品清单可带选款和来源页直达 `/contact#quote-form`；表单可逐款填写预计件数。服务端仅接受目录中存在的型号，并把型号、逐款件数、总量、来源页和项目路线写入私有 Blob。相同提交 ID 重试返回同一参考号；同 ID 不同内容拒绝覆盖。
- 提交状态按真实结果展示：保存成功才显示参考号；明确的拒绝显示“未保存”；超时或响应不明显示“状态未知”并允许用同一 ID 重试。保存后团队邮件通知另分 `accepted`、`failed`、`pending_setup`，不会把通知失败误报成询盘保存失败。`accepted` 仅代表邮件服务商接受请求，不代表收件箱送达。
- **真实集成验证（本地新版代码 + 现有私有 Blob）**：单款合成询盘 `a1360dae-7f5b-482a-80a9-bb16def76339`、多款合成询盘 `5585dc57-133d-4c5e-a4f8-9c74401f05ed`，两者首次 201、相同请求重试 200、改内容 409，私有读回正确。390px 手机浏览器又提交一条标注 `SYSTEM TEST / NO CUSTOMER` 的合成询盘 `8804f5eb-bc1e-4519-991e-ddded0ebac29`，HTTP 201；读回 LS006 120 件、DYS201 240 件、总量 360 件、来源产品页及 `pending_setup`。这些均不是生产新版验证，不是客户线索。
- **模拟验证**：单元测试覆盖存储故障、限流、并发重试、邮件服务商失败、跨域/坏数据拒绝、超时与畸形成功响应。手机真实点击了选款、清单、跳转、两步表单和提交。生产构建在本机 `127.0.0.1` 测试时被正常的 Origin 校验拒绝，页面显示“未保存”；改用 `localhost` 开发服务器完成手机端真实存储验证，未放宽线上 Origin 限制。
- **仍阻塞**：生产尚无 `RESEND_API_KEY` 和 `INQUIRY_NOTIFICATION_FROM`，所以团队自动通知为 `pending_setup`；客户目前只有页面参考号，没有客户邮件回执。不可称邮件送达或生产新版闭环已上线。接通前需验证发件域名、`INQUIRY_NOTIFICATION_TO` 接收地址、邮件服务商接受与收件箱送达，并在预览部署复测。

## P1 工厂入口与重点产品

- 桌面主导航和手机菜单均有 **Factory & quality**；工厂页使用现有真实照片说明可见的缝纫工位、仓储、装柜场景，列出面料/部件、样衣确认、生产和质检核查路径，以及买家可要求的当前记录。照片本身不证明拍摄日期、具体订单工序或认证，因此没有把这些写成已验证事实。主要询盘按钮直达表单。
- 已核对 LS006、DYS201、DYS323、M005 的独立 title、description、H1、内链、canonical 和 `ItemPage`/`BreadcrumbList`。四页均在 sitemap，robots 允许抓取，未输出虚假的 `Product`/`Offer`/`Review`/`AggregateRating`。无公开价格的询盘商品没有 0 元报价。M005 来源中的“五英寸”没有测量方法，现有旧 slug 保留，确定性的标题/H1 不再把它当作已核实成衣内长。
- 浏览器截图：[手机样品询盘](optimization-mobile-contact-2026-09-27.png)、[桌面工厂页](optimization-desktop-factory-2026-09-27.png)。截图只证明本地工作分支界面；私有存储读回与 HTTP 状态见上述参考号及 `.tmp/verify_inquiry_p0.mjs`。

## 检查与上线核对

- `npm test`：78/78 通过；变更相关文件 ESLint 通过；`npm run build`：Next 构建与 TypeScript 通过；`services/api` 目录执行 `pytest tests/test_conversions.py -q`：25/25 通过。四个产品页的本地 HTML 检查、robots/sitemap 检查通过。
- 上线前先对照指定 Markdown；核对 45 款的当前 MOQ、混码混色及哪些定制路线可适用 100 件；确认通知发件域名和接收人；以预览部署验证同域手机/桌面提交、私有读回、通知与客户回执文案；检查生产 `robots.txt`、sitemap、canonical 和四个重点产品页面。生产部署之后再做真实环境监测，不把本地合成询盘当成线上业务成功。
- 内部待补素材：每款成衣尺寸与公差、混码混色规则、当前面料/色卡、样品费用和期限、每种贴牌/包装起订量、实际订单交期、检验记录样例、可核验认证及范围、带日期与设备说明的工厂/质检照片。得到资料前不发布具体保证、空白占位或生成的“实拍工厂”图。
- 本轮没有生产变更，因此无线上回滚动作。未来发布前应记录将要替换的 Vercel deployment ID；若上线后询盘失败，优先把域名流量恢复到上一个已验证部署，并导出故障期间私有询盘供人工处理。当前工作树含大量先前未提交成果，**不要用 `git reset --hard` 作为回滚**；只回退经逐文件审查的本轮差异。
