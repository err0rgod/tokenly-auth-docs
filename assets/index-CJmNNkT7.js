(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const i=[{id:"home",section:"Start",title:"FastAPI-Auth (Tokenly-Auth)",summary:"A database-agnostic authentication and session management utility library for Python.",body:`
      <section class="hero">
        <div>
          <p class="eyebrow">Security primitives for Python APIs</p>
          <h1>FastAPI-Auth (Tokenly-Auth)</h1>
          <p class="lead">Professional-grade authentication and session management utilities without forcing an ORM, database, or model structure.</p>
          <div class="hero-actions">
            <a class="primary-action" href="#crypto">Explore modules</a>
            <button class="secondary-action copy-inline" type="button" data-copy="pip install tokenly-auth">Copy install</button>
          </div>
        </div>
        <div class="install-panel" aria-label="Installation command">
          <span>Install</span>
          <code>pip install tokenly-auth</code>
        </div>
      </section>

      <h2 id="core-features">Core Features</h2>
      <div class="feature-grid">
        <article>
          <h3>Crypto Utilities</h3>
          <p>Argon2id password hashing and verification with brute-force protection logic.</p>
        </article>
        <article>
          <h3>Token Management</h3>
          <p>JWT creation, verification, and secure refresh token primitives.</p>
        </article>
        <article>
          <h3>Middleware</h3>
          <p>Storage-agnostic rate limiting and authentication decorators.</p>
        </article>
        <article>
          <h3>Validation</h3>
          <p>Strict structural validation for usernames and passwords.</p>
        </article>
      </div>

      <h2 id="quick-start">Quick Start</h2>
      <p>Start with the module guides for practical usage examples.</p>
      <ul>
        <li><a href="#crypto">Crypto Module</a>: Hash and verify passwords using Argon2id.</li>
        <li><a href="#tokens">Tokens Module</a>: Manage JWT access and refresh tokens.</li>
        <li><a href="#middleware">Middleware Module</a>: Rate limiting and authentication decorators.</li>
        <li><a href="#validators">Validators Module</a>: Enforce strict credential requirements.</li>
        <li><a href="#architecture">Architecture</a>: Learn about the database-agnostic philosophy.</li>
      </ul>
    `},{id:"crypto",section:"Core Modules",title:"Crypto",summary:"Password hashing, password verification, lockout checks, and password resets.",body:`
      <h1>Crypto</h1>
      <p>The <code>crypto</code> module provides robust security primitives for password hashing and verification using the industry-standard <strong>Argon2id</strong> algorithm. It includes built-in brute-force protection logic.</p>

      <h2 id="functions">Functions</h2>
      <h3 id="hashing-passwords">Hashing Passwords</h3>
      <p>Use the <code>hash_password</code> function to generate a secure Argon2 hash.</p>
      <pre><code class="language-python">from tokenly_auth.crypto.passwords import hash_password

hashed = hash_password("my_secure_password", user_id="user_123")</code></pre>

      <h3 id="verifying-passwords">Verifying Passwords</h3>
      <p>Use the <code>verifyPassword</code> function to compare a plain-text password against a stored hash. It supports brute-force protection by checking a <code>locked_until</code> timestamp.</p>
      <pre><code class="language-python">from tokenly_auth.crypto.passwords import verifyPassword
from datetime import datetime

is_valid = verifyPassword("my_secure_password", hashed, user_id="user_123")

is_valid = verifyPassword(
    "my_secure_password",
    hashed,
    user_id="user_123",
    locked_until=datetime(2030, 1, 1),
)</code></pre>

      <h3 id="resetting-passwords">Resetting Passwords</h3>
      <p>Use the <code>resetPassword</code> function to safely update a password. This function first verifies the old password before generating a new hash.</p>
      <pre><code class="language-python">from tokenly_auth.crypto.passwords import resetPassword

new_hash = resetPassword(
    old_hash=hashed,
    old_password_plain="old_password",
    new_password="new_password_123",
    user_id="user_123",
)</code></pre>
    `},{id:"tokens",section:"Core Modules",title:"Tokens",summary:"JWT generation, JWT verification, and secure refresh token hashing.",body:`
      <h1>Tokens</h1>
      <p>The <code>tokens</code> module handles JSON Web Token generation and verification, plus secure refresh token management.</p>

      <h2 id="access-tokens-jwt">Access Tokens (JWT)</h2>
      <p>The <code>jwtHandler</code> class manages JWT creation and verification. It uses strong cryptographic signatures, with <code>HS256</code> by default and <code>RS256</code> also supported.</p>

      <h3 id="initialization">Initialization</h3>
      <pre><code class="language-python">from tokenly_auth.tokens.jwt import jwtHandler

handler = jwtHandler(SECRET_KEY="your_super_secret_key", algorithm="HS256")</code></pre>

      <h3 id="creating-tokens">Creating Tokens</h3>
      <p><code>createJwt</code> generates both a short-lived access token and a cryptographically secure random refresh token.</p>
      <pre><code class="language-python">tokens = handler.createJwt(sub="user_id_123", jwt_mins=15, refresh_days=7)

# {
#   "access_token": "eyJhbGciOiJIUzI1NiIsInR5c...",
#   "refresh_token": "a_secure_urlsafe_random_string",
#   "refresh_days": 7
# }</code></pre>

      <h3 id="verifying-tokens">Verifying Tokens</h3>
      <p><code>verifyJwt</code> decodes and validates the token signature and expiration date. Invalid or expired tokens raise <code>ValueError</code>.</p>
      <pre><code class="language-python">try:
    payload = handler.verifyJwt(tokens["access_token"])
    print(payload["sub"])
except ValueError as e:
    print(f"Token error: {e}")</code></pre>

      <h2 id="refresh-tokens">Refresh Tokens</h2>
      <p>The <code>RefreshManager</code> provides utilities for hashing refresh tokens before storing them in the database.</p>
      <pre><code class="language-python">from tokenly_auth.tokens.refresh import RefreshManager

session_util = RefreshManager()
storage_hash = session_util.hash_refresh_token(tokens["refresh_token"])</code></pre>
    `},{id:"middleware",section:"Core Modules",title:"Middleware",summary:"Authentication decorators and storage-agnostic rate limiting.",body:`
      <h1>Middleware</h1>
      <p>The <code>middleware</code> module provides decorators and classes to protect endpoints with authentication and rate limiting.</p>

      <h2 id="authentication-decorator">Authentication Decorator</h2>
      <p>The <code>require_auth</code> decorator enforces JWT authentication on a function. It integrates with <code>jwtHandler</code> and can optionally check token blacklist state.</p>
      <pre><code class="language-python">from tokenly_auth.middleware.auth import require_auth
from tokenly_auth.tokens.jwt import jwtHandler

handler = jwtHandler(SECRET_KEY="your_secret_key")

@require_auth(jwt_handler=handler, isBlacklisted=False)
def protected_route(payload):
    return f"Hello, User {payload['sub']}!"</code></pre>
      <p><strong>Note:</strong> The decorator expects the access token to be passed as the first positional argument, <code>token</code>, when the decorated function is called.</p>

      <h2 id="rate-limiting">Rate Limiting</h2>
      <p>The <code>RateLimiter</code> class implements a storage-agnostic rate limiting mechanism for brute-force protection and API abuse mitigation.</p>
      <p>It requires a storage client, such as Redis or Memcached, that supports <code>incr</code> and <code>expire</code> operations.</p>

      <h3 id="integration-with-redis">Integration with Redis</h3>
      <pre><code class="language-python">import redis
from tokenly_auth.middleware.ratelimit import RateLimiter

redis_client = redis.Redis(host="localhost", port=6379, db=0)
limiter = RateLimiter(storage_client=redis_client, max_requests=5, window=60)

def login_endpoint(username: str):
    try:
        current_count = limiter.check_limit(identifier=username, action="login")
        print(f"Login attempt {current_count} for {username}")
    except ValueError as e:
        return {"error": str(e)}</code></pre>
    `},{id:"validators",section:"Core Modules",title:"Validators",summary:"Credential structure enforcement for usernames and passwords.",body:`
      <h1>Validators</h1>
      <p>The <code>validators</code> module provides decorators to enforce strict structural requirements on user credentials before they reach the database or hashing logic.</p>

      <h2 id="credential-structure">Credential Structure</h2>
      <p>The <code>validate_creds_structure</code> decorator wraps registration or password reset handlers and validates <code>user_name</code> and <code>password</code> arguments.</p>

      <h3 id="rules-enforced">Rules Enforced</h3>
      <div class="rule-grid">
        <article>
          <h4>Username</h4>
          <ul>
            <li>Must be between 3 and 15 characters long.</li>
            <li>Must be purely alphanumeric.</li>
          </ul>
        </article>
        <article>
          <h4>Password</h4>
          <ul>
            <li>Minimum of 8 characters.</li>
            <li>At least one uppercase letter.</li>
            <li>At least one lowercase letter.</li>
            <li>At least one digit.</li>
            <li>At least one special character.</li>
          </ul>
        </article>
      </div>

      <h3 id="usage">Usage</h3>
      <pre><code class="language-python">from tokenly_auth.validators.credentials import validate_creds_structure

@validate_creds_structure
def register_user(user_name: str, password: str, email: str):
    print(f"Registering {user_name} with email {email}")
    return True

register_user("johnDoe123", "StrongPass!1", "john@example.com")

try:
    register_user("johnDoe123", "WeakPassword!", "john@example.com")
except ValueError as e:
    print(e)</code></pre>
    `},{id:"architecture",section:"Architecture",title:"Architecture",summary:"Why Tokenly-Auth keeps security logic independent from storage logic.",body:`
      <h1>Architecture</h1>
      <p>Tokenly-Auth is built around a singular philosophy: <strong>database agnosticism</strong>.</p>

      <h2 id="why-database-agnostic">Why Database Agnostic?</h2>
      <p>Unlike authentication libraries that force a specific ORM such as SQLAlchemy, SQLModel, or Tortoise ORM, Tokenly-Auth acts strictly as a security toolkit.</p>
      <p>Authentication and security logic should not dictate the data access layer.</p>

      <h3 id="tightly-coupled-auth">The Problem with Tightly Coupled Auth</h3>
      <ul>
        <li>Migrating databases can require replacing the entire authentication system.</li>
        <li>Applications are forced into specific schema designs and hardcoded table assumptions.</li>
        <li>Heavy dependencies increase bloat and deployment complexity.</li>
      </ul>

      <h3 id="tokenly-auth-solution">The Tokenly-Auth Solution</h3>
      <ul>
        <li>You control the database: PostgreSQL, MongoDB, Redis, or another store.</li>
        <li>You control models, schemas, and queries.</li>
        <li>Tokenly-Auth handles password hashing, signing, brute-force mitigation, and token validation.</li>
      </ul>
      <p>By decoupling security logic from storage logic, Tokenly-Auth stays flexible for modern, service-oriented Python applications.</p>
    `}],_=document.querySelector("#primaryNav"),d=document.querySelector("#tocNav"),n=document.querySelector("#content"),l=document.querySelector("#sidebar"),u=document.querySelector("#menuButton"),v=document.querySelector("#searchTrigger"),m=document.querySelector("#searchDialog"),h=document.querySelector("#searchInput"),g=document.querySelector("#searchResults"),b=document.querySelector("#themeToggle"),T=document.querySelector("#themeLabel"),p=e=>e.toLowerCase().replace(/<[^>]+>/g," "),A=i.reduce((e,t)=>(e[t.section]=e[t.section]||[],e[t.section].push(t),e),{});function S(){_.innerHTML=Object.entries(A).map(([e,t])=>`
      <section class="nav-section">
        <p>${e}</p>
        ${t.map(s=>`<a href="#${s.id}" data-doc-id="${s.id}">${s.title}</a>`).join("")}
      </section>
    `).join("")}function L(){const e=window.location.hash.replace("#","")||"home";return i.find(t=>t.id===e)||i[0]}function y(){const e=L();document.title=`${e.title} | Tokenly-Auth Docs`,n.innerHTML=`<article class="doc-page">${e.body}</article>`,n.focus({preventScroll:!0}),l.classList.remove("is-open"),u.setAttribute("aria-expanded","false"),M(e.id),C(),E(),x()}function M(e){document.querySelectorAll("[data-doc-id]").forEach(t=>{t.classList.toggle("is-active",t.dataset.docId===e)})}function C(){const e=[...n.querySelectorAll("h2[id], h3[id]")];if(!e.length){d.innerHTML="";return}d.innerHTML=e.map(t=>`<a class="toc-${t.tagName.toLowerCase()}" href="#${t.id}" data-anchor="${t.id}">${t.textContent}</a>`).join("")}function E(){n.querySelectorAll("pre").forEach(e=>{if(e.querySelector(".copy-code"))return;const t=document.createElement("button");t.className="copy-code",t.type="button",t.textContent="Copy",t.addEventListener("click",async()=>{await navigator.clipboard.writeText(e.querySelector("code").innerText),t.textContent="Copied",window.setTimeout(()=>{t.textContent="Copy"},1200)}),e.append(t)})}function x(){n.querySelectorAll("[data-copy]").forEach(e=>{e.addEventListener("click",async()=>{await navigator.clipboard.writeText(e.dataset.copy);const t=e.textContent;e.textContent="Copied",window.setTimeout(()=>{e.textContent=t},1200)})})}function f(){m.showModal(),h.value="",w(""),h.focus()}function w(e){const t=p(e.trim()),s=t?i.filter(a=>p(`${a.title} ${a.summary} ${a.body}`).includes(t)):i;g.innerHTML=s.map(a=>`
      <a href="#${a.id}" data-search-hit>
        <strong>${a.title}</strong>
        <span>${a.summary}</span>
      </a>
    `).join("")||'<p class="empty-state">No matching docs found.</p>'}function k(e){document.documentElement.dataset.theme=e,localStorage.setItem("docs-theme",e),T.textContent=e==="dark"?"Light":"Dark"}function P(){const e=localStorage.getItem("docs-theme"),t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";k(e||t)}u.addEventListener("click",()=>{const e=!l.classList.contains("is-open");l.classList.toggle("is-open",e),u.setAttribute("aria-expanded",String(e))});v.addEventListener("click",f);h.addEventListener("input",e=>w(e.target.value));g.addEventListener("click",e=>{e.target.closest("[data-search-hit]")&&m.close()});d.addEventListener("click",e=>{const t=e.target.closest("[data-anchor]");t&&(e.preventDefault(),document.getElementById(t.dataset.anchor)?.scrollIntoView())});b.addEventListener("click",()=>{k(document.documentElement.dataset.theme==="dark"?"light":"dark")});document.addEventListener("keydown",e=>{e.key==="/"&&!e.ctrlKey&&!e.metaKey&&document.activeElement.tagName!=="INPUT"&&(e.preventDefault(),f())});window.addEventListener("hashchange",()=>{y()});S();P();y();
