'use client';

import { useMemo } from 'react';
import { cn } from '../../lib/utils';
import { programs as allPrograms } from '../../data/programs';
import {useTranslations} from 'next-intl';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  TooltipProps
} from 'recharts';

const COLORS = ['#4F46E5', '#6366F1', '#7C3AED', '#F97316', '#10B981'];
const COLOR_CLASSES = ['bg-[#4F46E5]', 'bg-[#6366F1]', 'bg-[#7C3AED]', 'bg-[#F97316]', 'bg-[#10B981]'];

const CustomTooltip = ({ active, payload, label, unitLabel }: TooltipProps<number, string> & {unitLabel: string}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0B1220] border border-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-300">
        <p className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] mb-1">{label || payload[0].name}</p>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#F97316] shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
          <p className="text-white text-lg font-black tracking-tight">
            {payload[0].value} <span className="text-[10px] text-[#64748B] font-medium ml-1">{unitLabel}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const Insights = () => {
  const t = useTranslations('insights');
  const stats = useMemo(() => {
    const typeCounts: Record<string, number> = {};
    const levelCounts: Record<string, number> = {};
    const langCounts: Record<string, number> = {};

    allPrograms.forEach(p => {
      typeCounts[p.educationType] = (typeCounts[p.educationType] || 0) + 1;
      levelCounts[p.level] = (levelCounts[p.level] || 0) + 1;
      langCounts[p.language] = (langCounts[p.language] || 0) + 1;
    });

    const typeData = Object.entries(typeCounts).map(([name, value]) => ({ name, value }));
    const levelData = Object.entries(levelCounts).map(([name, value]) => ({ name, value }));
    const langData = Object.entries(langCounts).map(([name, value]) => ({ name, value }));
    
    // Ecosystem Mapping data (Radar Chart)
    const radarData = typeData.map(item => ({
      subject: item.name,
      A: item.value,
      fullMark: Math.max(...typeData.map(d => d.value)) + 2
    }));

    return { typeData, levelData, langData, radarData };
  }, []);

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Education Type Distribution */}
        <div className="premium-card p-8 hover:border-[#4F46E5]/30 group transition-all duration-300 md:col-span-2">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="label-premium text-[10px] text-[#64748B]">{t('framework')}</h3>
              <p className="text-xl font-bold text-[#0B1220] tracking-tight mt-1">{t('edu_type')}</p>
            </div>
          </div>
          
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.typeData} layout="vertical" margin={{ left: -20, right: 20 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#6366F1" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" opacity={0.5} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 700, fill: '#475569' }}
                  width={80}
                />
                <Tooltip content={<CustomTooltip unitLabel={t('units')} />} cursor={{ fill: 'rgba(79, 70, 229, 0.02)' }} />
                <Bar 
                  dataKey="value" 
                  fill="url(#barGradient)" 
                  radius={[0, 4, 4, 0]} 
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ecosystem Mapping - Radar Chart */}
        <div className="premium-card p-8 hover:border-[#F97316]/30 group transition-all duration-300">
          <div className="flex flex-col h-full">
            <div className="text-center mb-6">
              <h3 className="label-premium text-[10px] text-[#64748B] tracking-[0.2em]">{t('mapping')}</h3>
            </div>
            
            <div className="flex-grow flex items-center justify-center min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={stats.radarData}>
                  <PolarGrid stroke="#E2E8F0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 10, fontWeight: 700 }} />
                  <Radar
                    name={t('edu_type')}
                    dataKey="A"
                    stroke="#F97316"
                    fill="#F97316"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.2em] opacity-60">{t('cluster')}</p>
            </div>
          </div>
        </div>

        {/* Degree Level Distribution */}
        <div className="premium-card p-8 hover:border-[#F97316]/30 group transition-all duration-300">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="label-premium text-[10px] text-[#64748B]">{t('leveling')}</h3>
              <p className="text-xl font-bold text-[#0B1220] tracking-tight mt-1">{t('level')}</p>
            </div>
          </div>
          
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.levelData} margin={{ bottom: 10 }}>
                <defs>
                  <linearGradient id="levelGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#FB923C" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 700, fill: '#475569' }}
                  dy={10}
                  interval={0}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 700, fill: '#475569' }}
                />
                <Tooltip content={<CustomTooltip unitLabel={t('units')} />} cursor={{ fill: 'rgba(249, 115, 22, 0.02)' }} />
                <Bar 
                  dataKey="value" 
                  fill="url(#levelGradient)" 
                  radius={[4, 4, 0, 0]} 
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Language Mix */}
        <div className="premium-card p-8 hover:border-[#4F46E5]/30 md:col-span-2 group transition-all duration-300">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="label-premium text-[10px] text-[#64748B]">{t('language')}</h3>
              <p className="text-xl font-bold text-[#0B1220] tracking-tight mt-1">{t('lang_mix')}</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="h-[240px] w-full md:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.langData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={95}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {stats.langData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip unitLabel={t('units')} />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-6 w-full md:w-1/2">
              {stats.langData.map((item, index) => (
                <div key={item.name} className="flex flex-col gap-1 p-4 border border-[#E2E8F0] rounded-lg group/item hover:border-[#4F46E5]/20 transition-all">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-2 h-2 rounded-full", COLOR_CLASSES[index % COLOR_CLASSES.length])} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#64748B]">{item.name}</span>
                  </div>
                  <p className="text-2xl font-bold text-[#0B1220] tracking-tight mt-1">{item.value}</p>
                  <p className="text-[10px] font-medium text-[#94A3B8]">{t('indexed')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
