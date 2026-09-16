/** Admin panel ↔ backend API helpers. Load after DOM; used by admin.html */
(function () {
  const API = '';
  window.TEG = window.TEG || {};

  TEG.getKey = () => sessionStorage.getItem('teg_admin_key') || '';

  TEG.api = async function (path, opts = {}) {
    const headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
    if (TEG.getKey()) headers['x-admin-key'] = TEG.getKey();
    const res = await fetch(API + path, Object.assign({}, opts, { headers }));
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || res.statusText || 'Request failed');
    return data;
  };

  TEG.loginServer = async function (password) {
    const data = await TEG.api('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password })
    });
    if (data.ok && data.token) {
      sessionStorage.setItem('teg_admin_key', data.token);
      sessionStorage.setItem('teg_admin', '1');
      return true;
    }
    return false;
  };

  TEG.loadContentServer = async function () {
    const data = await TEG.api('/api/admin/content');
    return data.data;
  };

  TEG.saveContentServer = async function (content) {
    return TEG.api('/api/admin/content', {
      method: 'PUT',
      body: JSON.stringify(content)
    });
  };

  TEG.loadSubmissions = async function () {
    const data = await TEG.api('/api/admin/submissions');
    return data.data || [];
  };

  TEG.uploadFile = async function (file) {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch(API + '/api/admin/upload', {
      method: 'POST',
      headers: { 'x-admin-key': TEG.getKey() },
      body: fd
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Upload failed');
    return data.url;
  };
})();
