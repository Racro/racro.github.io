// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "thoughts, stories and ideas",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "publications by categories in reversed chronological order.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "dropdown-bookshelf",
              title: "bookshelf",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/books/";
              },
            },{id: "books-on-the-shortness-of-life",
          title: 'On the Shortness of Life',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_template/";
            },},{id: "news-received-fellowship-to-attend-suri-epfl-on-on-systems-security-and-privacy",
          title: 'Received fellowship to attend SuRI, EPFL on on Systems, Security, and Privacy.',
          description: "",
          section: "News",},{id: "news-received-fellowship-to-attend-cispa-summer-school-on-usable-security",
          title: 'Received fellowship to attend CISPA Summer School on Usable Security.',
          description: "",
          section: "News",},{id: "news-finished-my-summer-intern-at-cispa-germany-to-work-on-differentual-treatment-of-adblocker-users-advised-by-prof-ben-stock",
          title: 'Finished my summer intern at CISPA, Germany to work on differentual treatment of...',
          description: "",
          section: "News",},{id: "news-presented-a-poster-on-propaganda-generation-by-llms-at-nyc-privacy-day-at-columbia-university",
          title: 'Presented a poster on propaganda generation by LLMs at NYC Privacy Day at...',
          description: "",
          section: "News",},{id: "news-our-paper-on-understanding-problematic-content-in-allowed-advertisements-got-accepted-in-pets-2025",
          title: 'Our paper on Understanding Problematic Content in ‘allowed’ Advertisements got accepted in PETS...',
          description: "",
          section: "News",},{id: "news-presented-a-poster-on-problematic-content-in-acceptable-ads-at-google-ad-privacy-day-in-san-francisco",
          title: 'Presented a poster on problematic content in Acceptable Ads at Google Ad Privacy...',
          description: "",
          section: "News",},{id: "poems-दिवाली",
          title: 'दिवाली',
          description: "",
          section: "Poems",handler: () => {
              window.location.href = "/poems/diwali/";
            },},{id: "poems-एक-शख़्स",
          title: 'एक शख़्स',
          description: "",
          section: "Poems",handler: () => {
              window.location.href = "/poems/ek-shaqs/";
            },},{id: "poems-इंस्टी-तुम्हे-बुलाता-हूँ",
          title: 'इंस्टी तुम्हे बुलाता हूँ',
          description: "",
          section: "Poems",handler: () => {
              window.location.href = "/poems/insti-bulata-hoon/";
            },},{id: "poems-ख्वाब-लग-रही-हो",
          title: 'ख्वाब लग रही हो',
          description: "",
          section: "Poems",handler: () => {
              window.location.href = "/poems/khwaab-lag-rhi-ho/";
            },},{id: "poems-लहर",
          title: 'लहर',
          description: "",
          section: "Poems",handler: () => {
              window.location.href = "/poems/leher/";
            },},{id: "poems-मुस्कुरा-दोगी-क्या",
          title: 'मुस्कुरा दोगी क्या?',
          description: "",
          section: "Poems",handler: () => {
              window.location.href = "/poems/muskura-dogi-kya/";
            },},{id: "poems-पहले-प्यार-की-कहानी",
          title: 'पहले प्यार की कहानी',
          description: "",
          section: "Poems",handler: () => {
              window.location.href = "/poems/pehle-pyaar-ki-kahani/";
            },},{id: "poems-प्यार-हो-रहा-है",
          title: 'प्यार हो रहा है',
          description: "",
          section: "Poems",handler: () => {
              window.location.href = "/poems/pyaar-ho-raha-hai/";
            },},{id: "poems-क्वारंटाइन-quarantine",
          title: 'क्वारंटाइन (quarantine)',
          description: "",
          section: "Poems",handler: () => {
              window.location.href = "/poems/quarantine/";
            },},{id: "poems-सपने",
          title: 'सपने',
          description: "",
          section: "Poems",handler: () => {
              window.location.href = "/poems/sapne/";
            },},{id: "poems-टूटे-दिल-से",
          title: 'टूटे दिल से',
          description: "",
          section: "Poems",handler: () => {
              window.location.href = "/poems/toote-dil-se/";
            },},{id: "poems-तुम",
          title: 'तुम',
          description: "",
          section: "Poems",handler: () => {
              window.location.href = "/poems/tum/";
            },},{id: "poems-तुम्हारा-बस-खयाल-है",
          title: 'तुम्हारा बस खयाल है',
          description: "",
          section: "Poems",handler: () => {
              window.location.href = "/poems/tumhara-bas-khayal-hai/";
            },},{id: "poems-यादों-में-आ-गए",
          title: 'यादों में आ गए',
          description: "",
          section: "Poems",handler: () => {
              window.location.href = "/poems/yaadon-mein-aa-gye/";
            },},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
