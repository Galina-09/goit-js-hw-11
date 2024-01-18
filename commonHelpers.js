import{S as f}from"./assets/vendor-c9def49e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function l(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=l(e);fetch(e.href,r)}})();const m="https://pixabay.com/api",d="41864490-ab1aa9c4772cfd6b871252eca";function y(o,t="all",l="horizontal",n=!0){return fetch(`${m}/?key=${d}&q=${o}&image_type=${t}&orientation=${l}&safesearch=${n}`).then(e=>{if(!e.ok)throw new Error(e.statusText);return e.json()})}const a={gallery:document.querySelector(".gallery"),searchForm:document.querySelector(".search-form")};a.searchForm.addEventListener("submit",g);function g(o){o.preventDefault();const t=o.currentTarget,l=t.elements.query.value;y(l).then(h).catch(p).finally(()=>t.reset())}function h({hits:o}){const t=o.map(({comments:n,downloads:e,largeImageURL:r,likes:i,webformatURL:s,tags:c,views:u})=>`<li class="gallery-item">
        <a class="gallery-link" href="${r}" target="_blank">
          <img class="gallery-image" src="${s}" alt="${c}">
          <ul class="gallery-item-description">
            <li>Likes: ${i}</li>
            <li>Views: ${u}</li>
            <li>Downloads: ${e}</li>
            <li>Comments: ${n}</li>
          </ul>
        </a>
      </li>`).join("");a.gallery.innerHTML=t,new f(".gallery-item a",{captionsData:"alt",captionDelay:250}).refresh()}function p(o){alert("Упс, щось пішло не так і ми не знайшли вашого покемона!"),console.error(o)}
//# sourceMappingURL=commonHelpers.js.map
