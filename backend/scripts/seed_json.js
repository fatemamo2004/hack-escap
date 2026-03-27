const fs = require('fs');
const path = require('path');

const seedData = {
  events: [{
    name: "Hack & Escape",
    organizer: "Jordan Cyber Club",
    location: "Sports City (Al-Madina Al-Riyadiya), Amman, Jordan",
    date: "2026-07-01T09:00:00",
    description: {
      en: "Hack & Escape is a national cybersecurity competition that merges escape room logic puzzles with real cybersecurity scenarios. Born from a group of students joking about university assignments, it challenges traditional CTFs to introduce locally built Jordanian innovation.",
      ar: "هاك أند إسكيب هي مسابقة وطنية للأمن السيبراني تدمج ألغاز منطق غرف الهروب مع سيناريوهات حقيقية للأمن السيبراني. ولدت الفكرة من مجموعة طلاب يمزحون حول مهام الجامعة، وتتحدى التنسيقات التقليدية لتقديم ابتكار أردني محلي الصنع."
    },
    mission: {
      en: "Build a cyber-aware generation and push participants to think beyond traditional CTF formats.",
      ar: "بناء جيل واعي سيبرانياً ودفع المشاركين للتفكير خارج أطر مسابقات CTF التقليدية."
    }
  }],
  stats: [{
    participants: 45,
    teams: 15,
    universities: 15,
    attendees: 550,
    volunteers: 50
  }],
  members: [
    { name: "Jordan Cyber Club Core Team", role: { en: "Main Organizers", ar: "المنظمون الرئيسيون" }, bio: { en: "A passionate group of Jordanian innovators in cyber education.", ar: "مجموعة شغوفة من المبتكرين الأردنيين في مجال التعليم السيبراني." }, image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400" }
  ],
  sponsors: [
    { name: "Strategic Tech Partner", tier: "partner", logo: "SP" },
    { name: "Gold Cyber Shield", tier: "gold", logo: "GS" }
  ],
  timeline: [
    { title: { en: "Team Formation", ar: "تكوين الفريق" }, date: "Jan 2026", order: 1 },
    { title: { en: "Challenge Dev", ar: "تطوير التحديات" }, date: "Mar 2026", order: 2 },
    { title: { en: "Event Launch", ar: "إطلاق الفعالية" }, date: "July 2026", order: 5 }
  ],
  gallery: [
    { title: { en: "H&E 2025 Highlights", ar: "لقطات من هاك أند إسكيب ٢٠٢٥" }, image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800", type: "photo", category: { en: "Competition", ar: "المنافسة" } }
  ],
  media: [
    { title: { en: "Next-Gen Cyber Talent in Jordan", ar: "جيل جديد من المواهب السيبرانية في الأردن" }, source: "Jordan Tech News", url: "#" }
  ]
};

const runSeed = () => {
  const dataDir = path.join(__dirname, '../data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

  Object.keys(seedData).forEach(collection => {
    const dataWithIds = seedData[collection].map((item, i) => ({
      ...item,
      _id: (i + 1).toString(),
      createdAt: new Date().toISOString()
    }));
    fs.writeFileSync(path.join(dataDir, `${collection}.json`), JSON.stringify(dataWithIds, null, 2));
    console.log(`Seeded collection: ${collection}`);
  });
};

runSeed();
