const sampleSiteMap =
  '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"><url><loc>https://your-docusaurus-test-site.com/blog</loc><changefreq>weekly</changefreq><priority>0.5</priority></url><url><loc>https://your-docusaurus-test-site.com/blog/archive</loc><changefreq>weekly</changefreq><priority>0.5</priority></url><url><loc>https://your-docusaurus-test-site.com/blog/first-blog-post</loc><changefreq>weekly</changefreq><priority>0.5</priority></url><url><loc>https://your-docusaurus-test-site.com/blog/long-blog-post</loc><changefreq>weekly</changefreq><priority>0.5</priority></url><url><loc>https://your-docusaurus-test-site.com/blog/mdx-blog-post</loc><changefreq>weekly</changefreq><priority>0.5</priority></url><url><loc>https://your-docusaurus-test-site.com/blog/tags</loc><changefreq>weekly</changefreq><priority>0.5</priority></url><url><loc>https://your-docusaurus-test-site.com/blog/tags/docusaurus</loc><changefreq>weekly</changefreq><priority>0.5</priority></url><url><loc>https://your-docusaurus-test-site.com/blog/tags/facebook</loc><changefreq>weekly</changefreq><priority>0.5</priority></url><url><loc>https://your-docusaurus-test-site.com/blog/tags/hello</loc><changefreq>weekly</changefreq><priority>0.5</priority></url><url><loc>https://your-docusaurus-test-site.com/blog/tags/hola</loc><changefreq>weekly</changefreq><priority>0.5</priority></url><url><loc>https://your-docusaurus-test-site.com/blog/welcome</loc><changefreq>weekly</changefreq><priority>0.5</priority></url><url><loc>https://your-docusaurus-test-site.com/markdown-page</loc><changefreq>weekly</changefreq><priority>0.5</priority></url><url><loc>https://your-docusaurus-test-site.com/docs/category/tutorial---basics</loc><changefreq>weekly</changefreq><priority>0.5</priority></url><url><loc>https://your-docusaurus-test-site.com/docs/category/tutorial---extras</loc><changefreq>weekly</changefreq><priority>0.5</priority></url><url><loc>https://your-docusaurus-test-site.com/docs/intro</loc><changefreq>weekly</changefreq><priority>0.5</priority></url><url><loc>https://your-docusaurus-test-site.com/docs/tutorial-basics/congratulations</loc><changefreq>weekly</changefreq><priority>0.5</priority></url><url><loc>https://your-docusaurus-test-site.com/docs/tutorial-basics/create-a-blog-post</loc><changefreq>weekly</changefreq><priority>0.5</priority></url><url><loc>https://your-docusaurus-test-site.com/docs/tutorial-basics/create-a-document</loc><changefreq>weekly</changefreq><priority>0.5</priority></url><url><loc>https://your-docusaurus-test-site.com/docs/tutorial-basics/create-a-page</loc><changefreq>weekly</changefreq><priority>0.5</priority></url><url><loc>https://your-docusaurus-test-site.com/docs/tutorial-basics/deploy-your-site</loc><changefreq>weekly</changefreq><priority>0.5</priority></url><url><loc>https://your-docusaurus-test-site.com/docs/tutorial-basics/markdown-features</loc><changefreq>weekly</changefreq><priority>0.5</priority></url><url><loc>https://your-docusaurus-test-site.com/docs/tutorial-extras/manage-docs-versions</loc><changefreq>weekly</changefreq><priority>0.5</priority></url><url><loc>https://your-docusaurus-test-site.com/docs/tutorial-extras/translate-your-site</loc><changefreq>weekly</changefreq><priority>0.5</priority></url><url><loc>https://your-docusaurus-test-site.com/</loc><changefreq>weekly</changefreq><priority>0.5</priority></url></urlset>';

// import xml2js from "https://cdn.jsdelivr.net/npm/xml2js@0.6.0/+esm";

// const xml2js = import("https://cdn.jsdelivr.net/npm/xml2js@0.6.0/+esm"

function updateVisitedState(url, state, id) {
    const key = url.split("/")[0]
    state[key].items = state[key].items.map(item => item.path ===  url ? {...item, visited: true} :  {...item})
    console.log("state", {state, url, id})

//   for (const category in state) {
//     if(!state[category]?.items){
//         return
//     }
//     for (const item of state[category].items) {
//       if (url.endsWith(item.path)) {
//         if (visitedPages.hasOwnProperty(item.path)) {
//           visitedPages[item.path].visited = !visitedPages[item.path].visited;
//         } else {
//           visitedPages[item.path] = { visited: true };
//         }
//         item.visited = visitedPages[item.path].visited;
//       }
//     }
//   }

  localStorage.setItem(
    "docusaurus_progress_" + id,
    JSON.stringify(state)
  );
  // Update the progress UI
  return updateProgressUI(state);
}

function updateProgressUI(state) {
  const totalCount = Object.values(state).reduce(
    (sum, category) => sum + category.count,
    0
  );
  let visitedCount = 0;

  for (const category in state) {
    for (const item of state[category].items) {
      if (item.visited) {
        visitedCount++;
      }
    }
  }

  const progressPercentage = (visitedCount / totalCount) * 100;
  // Update the progress UI with the progressPercentage value
  return {progressPercentage, totalCount};
}

// Call the function with the current URL

const renderProgressBar = (state, id) => {
  setTimeout(() => {
    const collection = document.getElementsByClassName(
      "custom-progress-bar-fun"
    );

    const {progressPercentage, totalCount} = updateVisitedState(
      window.location.href.replace("http://localhost:3000/", ""),
      state,
      id
    );

    console.log("progressPercentage", progressPercentage);
    if (collection) {
      collection[0].innerHTML =
        `
          <label for="file">File progress:</label>
          <progress id="file" max="`+totalCount+`" value="` +
        progressPercentage +
        `"> ` +
        progressPercentage +
        `% </progress>
        `;
    }
  }, 1000);
};

const getProgress = async (id) => {
  const state = localStorage.getItem("docusaurus_progress_" + id);
  console.log("localStorage", state);
  if (state !== null) {
    renderProgressBar(JSON.parse(state), id);
    return;
  }

  const response = await fetch("/sitemap.xml");
  const sitemapXml = response || (await response.text());
  console.log("sitemapXml", sitemapXml);
  console.log("sampleSiteMap", sampleSiteMap);
  const regex = /<loc>(.*?)<\/loc>/g;
  const matches = sampleSiteMap.match(regex);

  // Remove prefix
  const cleanedItems = matches.map((item) =>
    item
      .replace("<loc>https://your-docusaurus-test-site.com/", "")
      .replace("</loc>", "")
  );

  //   console.log(cleanedItems);

  // Count categories
  const categoryMap = {};
  cleanedItems.forEach((item) => {
    const urlParts = item.split("/");
    const category = urlParts[0].split("/")[0]; // Get the first path segment before the second slash

    if (categoryMap.hasOwnProperty(category)) {
      categoryMap[category].count++;
      categoryMap[category].items.push({ path: item, visited: window.location.href.includes(item) });
    } else {
      categoryMap[category] = {
        count: 1,
        items: [{ path: item, visited: false }],
      };
    }
  });
  console.log("categoryMap", { categoryMap });
  localStorage.setItem(
    "docusaurus_progress_" + id,
    JSON.stringify(categoryMap)
  );
};

const fpPromise = import("https://openfpcdn.io/fingerprintjs/v3").then(
  (FingerprintJS) => FingerprintJS.load()
);
let USERFINGER_PRINT
fpPromise
  .then((fp) => fp.get())
  .then((result) => {
    USERFINGER_PRINT= result.visitorId;
    console.log(USERFINGER_PRINT);
    getProgress(USERFINGER_PRINT);

 
    window.addEventListener('popstate', function (event) {
        // The URL changed...
        console.log("popstate");

        getProgress(USERFINGER_PRINT);
    });
  });


