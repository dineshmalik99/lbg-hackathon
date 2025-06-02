export const generateCsvFromAudience = ({ fileName, filters, exclusions, segments }) => {
    // Mocked audience data — in a real app this comes from BigQuery
    const mockAudience = [
      { id: 1, name: 'Alice Smith', age: 45, product: 'Lloyds XXX' },
      { id: 2, name: 'Bob Jones', age: 72, product: 'BOS YYY' },
      { id: 3, name: 'Charlie Brown', age: 30, product: 'Lloyds XXX' },
    ];
  
    // Apply exclusions
    const excluded = [];
    const included = mockAudience.filter((person) => {
      if (exclusions.deceased && person.name.includes('Bob')) {
        excluded.push({ ...person, reason: 'Deceased' });
        return false;
      }
      if (exclusions.over70 && person.age > 70) {
        excluded.push({ ...person, reason: 'Over 70' });
        return false;
      }
      return true;
    });
  
    // Format rows for CSV
    const headers = ['ID', 'Name', 'Age', 'Product', 'Segment'];
    const rows = included.map((p) => {
      const matchedSegment = segments.find((seg) =>
        seg.filters.some((f) => {
          if (f.field === 'Product Type' && f.operator === '=')
            return f.value === p.product;
          return false;
        })
      );
      return [
        p.id,
        p.name,
        p.age,
        p.product,
        matchedSegment ? matchedSegment.name : 'Unsegmented',
      ];
    });
  
    const csvContent = [
      headers.join(','),
      ...rows.map((r) => r.join(',')),
    ].join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName || 'audience.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  
    console.log('CSV Export complete ✅');
    console.log('Excluded customers:', excluded);
  };
  