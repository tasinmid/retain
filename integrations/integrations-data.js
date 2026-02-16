const integrations = [
    {
        name: "Salesforce",
        iconType: "fontawesome",
        iconClass: "fab fa-salesforce",
        iconColor: "text-blue-600",
        backgroundColor: "bg-blue-100",
        subtitle: "Sync customer data seamlessly with your Salesforce CRM",
        tag: "CRM",
        tagBackgroundColor: "bg-blue-100",
        tagTextColor: "text-blue-800"
    },
    {
        name: "Facebook",
        iconType: "fontawesome",
        iconClass: "fab fa-facebook",
        iconColor: "text-blue-600",
        backgroundColor: "bg-purple-100",
        subtitle: "Connect with Facebook to engage customers through social media",
        tag: "Social Media",
        tagBackgroundColor: "bg-purple-100",
        tagTextColor: "text-purple-800"
    },
    {
        name: "Shopify",
        iconType: "fontawesome",
        iconClass: "fab fa-shopify",
        iconColor: "text-purple-600",
        backgroundColor: "bg-purple-100",
        subtitle: "Integrate with your Shopify store to track customer purchases",
        tag: "E-commerce",
        tagBackgroundColor: "bg-purple-100",
        tagTextColor: "text-purple-800"
    },
    {
        name: "Instagram",
        iconType: "fontawesome",
        iconClass: "fab fa-instagram",
        iconColor: "text-pink-600",
        backgroundColor: "bg-blue-100",
        subtitle: "Engage with customers through Instagram DMs and comments",
        tag: "Social Media",
        tagBackgroundColor: "bg-blue-100",
        tagTextColor: "text-blue-800"
    },
    {
        name: "Mailchimp",
        iconType: "fontawesome",
        iconClass: "fas fa-envelope",
        iconColor: "text-green-600",
        backgroundColor: "bg-green-100",
        subtitle: "Sync customer contacts and email campaign data",
        tag: "Email Marketing",
        tagBackgroundColor: "bg-green-100",
        tagTextColor: "text-green-800"
    },
    {
        name: "Messenger",
        iconType: "fontawesome",
        iconClass: "fab fa-facebook-messenger",
        iconColor: "text-blue-500",
        backgroundColor: "bg-blue-100",
        subtitle: "Connect with Facebook Messenger for direct customer communication",
        tag: "Communication Channel",
        tagBackgroundColor: "bg-blue-100",
        tagTextColor: "text-blue-800"
    },
    {
        name: "WhatsApp",
        iconType: "fontawesome",
        iconClass: "fab fa-whatsapp",
        iconColor: "text-green-500",
        backgroundColor: "bg-yellow-100",
        subtitle: "Connect your WhatsApp Business account for customer messaging",
        tag: "Communication Channel",
        tagBackgroundColor: "bg-yellow-100",
        tagTextColor: "text-yellow-800"
    },
    {
        name: "Twitter (X)",
        iconType: "fontawesome",
        iconClass: "fab fa-twitter",
        iconColor: "text-blue-400",
        backgroundColor: "bg-blue-100",
        subtitle: "Engage with customers through Twitter/X DMs and mentions",
        tag: "Social Media",
        tagBackgroundColor: "bg-blue-100",
        tagTextColor: "text-blue-800"
    },
    {
        name: "HubSpot",
        iconType: "fontawesome",
        iconClass: "fab fa-hubspot",
        iconColor: "text-indigo-600",
        backgroundColor: "bg-indigo-100",
        subtitle: "Connect with HubSpot CRM to manage customer relationships",
        tag: "CRM",
        tagBackgroundColor: "bg-indigo-100",
        tagTextColor: "text-indigo-800"
    },
    {
        name: "Telegram",
        iconType: "fontawesome",
        iconClass: "fab fa-telegram",
        iconColor: "text-blue-400",
        backgroundColor: "bg-green-100",
        subtitle: "Connect with Telegram for secure customer messaging",
        tag: "Communication Channel",
        tagBackgroundColor: "bg-green-100",
        tagTextColor: "text-green-800"
    },
    {
        name: "Notion",
        iconType: "svg",
        svgInnerHtml: '<path fill-rule="evenodd" clip-rule="evenodd" d="M5.716 29.2178L2.27664 24.9331C1.44913 23.9023 1 22.6346 1 21.3299V5.81499C1 3.86064 2.56359 2.23897 4.58071 2.10125L20.5321 1.01218C21.691 0.933062 22.8428 1.24109 23.7948 1.8847L29.3992 5.67391C30.4025 6.35219 31 7.46099 31 8.64426V26.2832C31 28.1958 29.4626 29.7793 27.4876 29.9009L9.78333 30.9907C8.20733 31.0877 6.68399 30.4237 5.716 29.2178Z" fill="white"/><path d="M11.2481 13.5787V13.3756C11.2481 12.8607 11.6605 12.4337 12.192 12.3982L16.0633 12.1397L21.417 20.0235V13.1041L20.039 12.9204V12.824C20.039 12.303 20.4608 11.8732 20.9991 11.8456L24.5216 11.6652V12.1721C24.5216 12.41 24.3446 12.6136 24.1021 12.6546L23.2544 12.798V24.0037L22.1906 24.3695C21.3018 24.6752 20.3124 24.348 19.8036 23.5803L14.6061 15.7372V23.223L16.2058 23.5291L16.1836 23.6775C16.1137 24.1423 15.7124 24.4939 15.227 24.5155L11.2481 24.6926C11.1955 24.1927 11.5701 23.7456 12.0869 23.6913L12.6103 23.6363V13.6552L11.2481 13.5787Z" fill="#000000"/><path fill-rule="evenodd" clip-rule="evenodd" d="M20.6749 2.96678L4.72347 4.05585C3.76799 4.12109 3.02734 4.88925 3.02734 5.81499V21.3299C3.02734 22.1997 3.32676 23.0448 3.87843 23.7321L7.3178 28.0167C7.87388 28.7094 8.74899 29.0909 9.65435 29.0352L27.3586 27.9454C28.266 27.8895 28.9724 27.1619 28.9724 26.2832V8.64426C28.9724 8.10059 28.6979 7.59115 28.2369 7.27951L22.6325 3.49029C22.0613 3.10413 21.3702 2.91931 20.6749 2.96678ZM5.51447 6.057C5.29261 5.89274 5.3982 5.55055 5.6769 5.53056L20.7822 4.44711C21.2635 4.41259 21.7417 4.54512 22.1309 4.82088L25.1617 6.96813C25.2767 7.04965 25.2228 7.22563 25.0803 7.23338L9.08387 8.10336C8.59977 8.12969 8.12193 7.98747 7.73701 7.7025L5.51447 6.057ZM8.33357 10.8307C8.33357 10.311 8.75341 9.88177 9.29027 9.85253L26.203 8.93145C26.7263 8.90296 27.1667 9.30534 27.1667 9.81182V25.0853C27.1667 25.604 26.7484 26.0328 26.2126 26.0633L9.40688 27.0195C8.8246 27.0527 8.33357 26.6052 8.33357 26.0415V10.8307Z" fill="#000000"/>',
        svgViewBox: "0 0 32 32",
        backgroundColor: "bg-white",
        subtitle: "Sync customer data and project information with Notion",
        tag: "Productivity Tool",
        tagBackgroundColor: "bg-teal-100",
        tagTextColor: "text-teal-800"
    },
    {
        name: "Discord",
        iconType: "fontawesome",
        iconClass: "fab fa-discord",
        iconColor: "text-purple-600",
        backgroundColor: "bg-blue-100",
        subtitle: "Connect with Discord for community engagement",
        tag: "Community Platform",
        tagBackgroundColor: "bg-blue-100",
        tagTextColor: "text-blue-800"
    },
    {
        name: "ClickUp",
        iconType: "svg",
        svgPath: "M298.67 649.36 377.42 589c41.82 54.6 86.23 79.76 135.72 79.76 49.21 0 92.41-24.87 132.35-79l79.84 58.88C667.74 726.74 596.08 768 513.14 768c-82.66 0-154.98-41-214.47-118.64zm214.22-262.17L372.72 508 308 432.82 513.17 256l203.61 177-65.08 74.83z",
        svgViewBox: "0 0 1024 1024",
        iconColor: "text-purple-600",
        backgroundColor: "bg-purple-50",
        subtitle: "Integrate with ClickUp to manage customer-related tasks",
        tag: "Project Management",
        tagBackgroundColor: "bg-purple-100",
        tagTextColor: "text-purple-800"
    },
    {
        name: "Slack",
        iconType: "fontawesome",
        iconClass: "fab fa-slack",
        iconColor: "text-purple-600",
        backgroundColor: "bg-purple-100",
        subtitle: "Connect with Slack for team collaboration and communication",
        tags: [
            {
                text: "Team Management",
                backgroundColor: "bg-indigo-100",
                textColor: "text-indigo-800"
            },
            {
                text: "Communication Channel",
                backgroundColor: "bg-blue-100",
                textColor: "text-blue-800"
            }
        ]
    },
    {
        name: "Google Sheets",
        iconType: "svg",
        svgInnerHtml: '<defs><style>.cls-1{fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;}</style></defs><path class="cls-1" d="M10.4,4.5a2,2,0,0,0-2,2v35a2,2,0,0,0,2,2H37.6a2,2,0,0,0,2-2v-27h-8a2,2,0,0,1-2-2v-8ZM16.55,18h14.9a1,1,0,0,1,1,1v19.7a1,1,0,0,1-1,1H16.55a1,1,0,0,1-1-1V19A1,1,0,0,1,16.55,18Z"/><line class="cls-1" x1="29.61" y1="4.5" x2="39.6" y2="14.49"/><line class="cls-1" x1="18.47" y1="23.32" x2="29.53" y2="23.32"/><line class="cls-1" x1="18.47" y1="28.79" x2="29.53" y2="28.79"/><line class="cls-1" x1="18.47" y1="34.28" x2="29.53" y2="34.28"/>',
        svgViewBox: "0 0 48 48",
        backgroundColor: "bg-white",
        subtitle: "Connect with Google Sheets for customer data storage",
        tag: "Data Storage",
        tagBackgroundColor: "bg-teal-100",
        tagTextColor: "text-teal-800"
    },
    {
        name: "Skype",
        iconType: "fontawesome",
        iconClass: "fab fa-skype",
        iconColor: "text-blue-500",
        backgroundColor: "bg-blue-100",
        subtitle: "Connect with Skype for video calls and messaging",
        tag: "Communication Channel",
        tagBackgroundColor: "bg-blue-100",
        tagTextColor: "text-blue-800"
    },
    {
        name: "Marketing Automation",
        iconType: "fontawesome",
        iconClass: "fas fa-bullhorn",
        iconColor: "text-purple-600",
        backgroundColor: "bg-red-100",
        subtitle: "Integrate with marketing platforms for personalized campaigns",
        tag: "Automation Tool",
        tagBackgroundColor: "bg-red-100",
        tagTextColor: "text-red-800"
    },
    {
        name: "Viber",
        iconType: "fontawesome",
        iconClass: "fab fa-viber",
        iconColor: "text-blue-500",
        backgroundColor: "bg-green-100",
        subtitle: "Connect with Viber for customer communication",
        tag: "Communication Channel",
        tagBackgroundColor: "bg-green-100",
        tagTextColor: "text-green-800"
    },
    {
        name: "Make",
        iconType: "fontawesome",
        iconClass: "fas fa-link",
        iconColor: "text-blue-600",
        backgroundColor: "bg-blue-100",
        subtitle: "Connect with Make to automate workflows and integrate services",
        tag: "Automation Tool",
        tagBackgroundColor: "bg-blue-100",
        tagTextColor: "text-blue-800"
    },
    {
        name: "n8n",
        iconType: "svg",
        svgInnerHtml: '<path clip-rule="evenodd" d="M24 8.4c0 1.325-1.102 2.4-2.462 2.4-1.146 0-2.11-.765-2.384-1.8h-3.436c-.602 0-1.115.424-1.214 1.003l-.101.592a2.38 2.38 0 01-.8 1.405c.412.354.704.844.8 1.405l.1.592A1.222 1.222 0 0015.719 15h.975c.273-1.035 1.237-1.8 2.384-1.8 1.36 0 2.461 1.075 2.461 2.4S20.436 18 19.078 18c-1.147 0-2.11-.765-2.384-1.8h-.975c-1.204 0-2.23-.848-2.428-2.005l-.101-.592a1.222 1.222 0 00-1.214-1.003H10.97c-.308.984-1.246 1.7-2.356 1.7-1.11 0-2.048-.716-2.355-1.7H4.817c-.308.984-1.246 1.7-2.355 1.7C1.102 14.3 0 13.225 0 11.9s1.102-2.4 2.462-2.4c1.183 0 2.172.815 2.408 1.9h1.337c.236-1.085 1.225-1.9 2.408-1.9 1.184 0 2.172.815 2.408 1.9h.952c.601 0 1.115-.424 1.213-1.003l.102-.592c.198-1.157 1.225-2.005 2.428-2.005h3.436c.274-1.035 1.238-1.8 2.384-1.8C22.898 6 24 7.075 24 8.4zm-1.23 0c0 .663-.552 1.2-1.232 1.2-.68 0-1.23-.537-1.23-1.2 0-.663.55-1.2 1.23-1.2.68 0 1.231.537 1.231 1.2zM2.461 13.1c.68 0 1.23-.537 1.23-1.2 0-.663-.55-1.2-1.23-1.2-.68 0-1.231.537-1.231 1.2 0 .663.55 1.2 1.23 1.2zm6.153 0c.68 0 1.231-.537 1.231-1.2 0-.663-.55-1.2-1.23-1.2-.68 0-1.231.537-1.231 1.2 0 .663.55 1.2 1.23 1.2zm10.462 3.7c.68 0 1.23-.537 1.23-1.2 0-.663-.55-1.2-1.23-1.2-.68 0-1.23.537-1.23 1.2 0 .663.55 1.2 1.23 1.2z" fill="#EA4B71" fill-rule="evenodd"></path>',
        svgViewBox: "0 0 24 24",
        backgroundColor: "bg-white",
        subtitle: "Connect with n8n to build automated workflows with visual tools",
        tag: "Automation Tool",
        tagBackgroundColor: "bg-pink-100",
        tagTextColor: "text-pink-800"
    },
    {
        name: "Voiceflow",
        iconType: "svg",
        svgPath: "M2.4 20.3L0 12l8.8 11.7 1.4-1.2-7.8-10.4zm22.4-7.4c-2.7-3.2-6.5-6.6-9.1-8.5C12.3 2 9.5.3 7 0L6.4.7c.8.6 3.2 2.3 5.4 4.1 2.3 1.8 5.7 4.7 8.1 7.2 2.2 2.2 4.4 5.3 4.8 6.4l.6-.5c-.3-1-2.4-4-4.9-7.2zm-2.4-1.9c-2.3-2.6-5.4-5.4-7.6-7.1L12 2.5 9.4 0H8.7L12 4.2c2.1 1.6 5 4.3 7.2 6.6 2 2 3.6 4.3 4 5.4l.7-.6c-.3-1.1-2-3.3-4-5.8zM0 12l2.4 8.3 7.8-10.4-1.4-1.2L0 12z",
        svgViewBox: "0 0 24 24",
        iconColor: "text-slate-800",
        backgroundColor: "bg-slate-100",
        subtitle: "Connect with Voiceflow to design and deploy voice experiences",
        tag: "AI Automation",
        tagBackgroundColor: "bg-slate-100",
        tagTextColor: "text-slate-800"
    },
    {
        name: "Botpress",
        iconType: "fontawesome",
        iconClass: "fas fa-robot",
        iconColor: "text-blue-600",
        backgroundColor: "bg-blue-50",
        subtitle: "Connect with Botpress to build conversational AI assistants",
        tag: "AI Automation",
        tagBackgroundColor: "bg-blue-100",
        tagTextColor: "text-blue-800"
    },
    {
        name: "Vapi",
        iconType: "svg",
        svgPath: "M12.511,17.189c-.164-6.811-.324-12.408-.356-12.44A7.886,7.886,0,0,0,9.891,5.913a7.578,7.578,0,0,0-2.545,3.3,8.39,8.39,0,0,0-.585,3.529,4.647,4.647,0,0,0,.2,1.955,3.4,3.4,0,0,1,.182.558c-.012.009-.337-.018-.722-.061-1.861-.206-2.776-1.046-2.991-2.747a6.288,6.288,0,0,1,1.449-4.7,15.077,15.077,0,0,1,8.383-5.144A12.843,12.843,0,0,1,15.8,2.373l1.741-.05.058,2.5c.032,1.373.1,6.334.16,11.025s-.251,8.259-.219,8.368c1.938-6.341,4.427-11.129,6.787-17.922l1.422-3.968h2.736c-.022.063-2.74,6.477-5.493,13.864l-5.452,13.5h-4.56C12.977,27.861,12.537,18.478,12.511,17.189Z",
        svgViewBox: "0 0 32 32",
        iconColor: "text-amber-600",
        backgroundColor: "bg-amber-50",
        subtitle: "Connect with Vapi to create voice-enabled applications",
        tag: "AI Automation",
        tagBackgroundColor: "bg-amber-100",
        tagTextColor: "text-amber-800"
    },
    {
        name: "OpenAI",
        iconType: "svg",
        svgInnerHtml: '<path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>',
        svgViewBox: "0 0 24 24",
        backgroundColor: "bg-white",
        subtitle: "Leverage GPT models for advanced natural language processing",
        tag: "AI Model",
        tagBackgroundColor: "bg-emerald-100",
        tagTextColor: "text-emerald-800"
    },
    {
        name: "Zapier",
        iconType: "svg",
        svgPath: "M128.08 0c7.231.013 14.343.624 21.256 1.78V76.3l52.831-52.695a128.425 128.425 0 0 1 16.34 13.788 128.468 128.468 0 0 1 13.84 16.312L179.513 106.4h74.715A127.579 127.579 0 0 1 256 127.587v.173c0 7.226-.613 14.306-1.772 21.2H179.5l52.847 52.683a129.615 129.615 0 0 1-13.824 16.312h-.015a128.255 128.255 0 0 1-16.326 13.788l-52.846-52.696v74.52a130.321 130.321 0 0 1-21.243 1.782h-.186a130.265 130.265 0 0 1-21.23-1.782v-74.52l-52.831 52.696a128.401 128.401 0 0 1-30.18-30.1L76.5 148.96H1.785A126.984 126.984 0 0 1 0 127.72v-.37c.012-1.876.135-4.167.311-6.537l.055-.713c.522-6.671 1.419-13.7 1.419-13.7H76.5L23.666 53.705a126.265 126.265 0 0 1 13.81-16.285l.026-.027a127.746 127.746 0 0 1 16.344-13.788L106.677 76.3V1.78A130.278 130.278 0 0 1 127.933 0zm-.013 95.76h-.122c-9.509 0-18.616 1.74-27.034 4.902a76.662 76.662 0 0 0-4.915 26.952v.12a76.383 76.383 0 0 0 4.927 26.951 76.608 76.608 0 0 0 27.022 4.902h.122c9.51 0 18.617-1.74 27.022-4.902a76.146 76.146 0 0 0 4.915-26.952v-.12c0-9.484-1.747-18.57-4.915-26.951a76.614 76.614 0 0 0-27.022-4.902z",
        svgViewBox: "0 0 256 256",
        iconColor: "text-orange-500",
        backgroundColor: "bg-orange-50",
        subtitle: "Connect with 5000+ apps and automate workflows without code",
        tag: "Automation Tool",
        tagBackgroundColor: "bg-orange-100",
        tagTextColor: "text-orange-800"
    },
    {
        name: "Trello",
        iconType: "fontawesome",
        iconClass: "fab fa-trello",
        iconColor: "text-blue-600",
        backgroundColor: "bg-blue-50",
        subtitle: "Organize projects and workflows with Trello boards",
        tag: "Project Management",
        tagBackgroundColor: "bg-blue-100",
        tagTextColor: "text-blue-800"
    }
];
