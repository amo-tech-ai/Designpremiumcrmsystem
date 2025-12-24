# 🔓 QUICK REFERENCE: DEV MODE

---

## 🎯 ONE-LINE SUMMARY

**Auth is now disabled. Refresh browser to see yellow badge and start coding!**

---

## 👀 VISUAL CONFIRMATION

Look for this badge (top-right corner):
```
┌─────────────────────────────┐
│ 🔓 DEV MODE - Auth Disabled │  ← Pulsing yellow
└─────────────────────────────┘
```

**If you see it:** ✅ Working!  
**If not:** Check App.tsx line 58

---

## 🔄 TOGGLE AUTH

### Disable (Current):
```typescript
// App.tsx, Line 58
const DEV_MODE_BYPASS_AUTH = true;
```

### Enable:
```typescript
// App.tsx, Line 58
const DEV_MODE_BYPASS_AUTH = false;
```

---

## ✅ WHAT WORKS

- ✅ All UI components
- ✅ All navigation
- ✅ All dashboards
- ✅ All views
- ✅ Demo data
- ⚠️ Database reads (limited)
- ❌ Database writes (blocked)

---

## 📊 FILES CHANGED

| File | Lines | Change |
|------|-------|--------|
| `/App.tsx` | 15 | Added dev mode flag + bypass logic |

---

## 🚀 READY!

**Just refresh browser and start coding!** 🎉

---

**To Re-enable:** Change `true` to `false` in App.tsx line 58
