import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#4318FF', '#6AD2FF', '#EFF4FB'];

export const StatisticsChart = ({ instructors, categories, courses }) => {
    const data = [
        { name: 'Instructors', value: instructors },
        { name: 'Categories', value: categories },
        { name: 'Courses', value: courses },
    ];

    const total = data.reduce((acc, item) => acc + item.value, 0);

    return (
        <div className="bg-white shadow-[0_6px_20px_rgba(0,0,0,0.08)] rounded-2xl p-5 h-full">
            <h3 className="text-lg font-semibold text-gray-700 text-start">Statistics</h3>
            <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        startAngle={90}
                        endAngle={-270}
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className='flex bg-white shadow-lg items-center justify-between text-start rounded-2xl p-2 mt-2'>
                {data.map((element, index) => (
                    <div key={index} className='flex items-baseline gap-1'>
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <div className='flex flex-col'>
                            <p className='text-[#96A0B6] text-sm'>{element.name}</p>
                            <h4 className='text-lg font-bold -mt-1.5'>
                                {total > 0 ? ((element.value / total) * 100).toFixed(1) : 0}%
                            </h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
