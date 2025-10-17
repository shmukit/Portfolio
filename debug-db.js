const { createClient } = require('@supabase/supabase-js');

// You'll need to provide your actual Supabase URL and key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_KEY';

if (supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseKey === 'YOUR_SUPABASE_KEY') {
  console.log('❌ Please set your Supabase credentials in environment variables');
  console.log('NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  try {
    console.log('🔍 Fetching projects from database...\n');
    
    const { data: projects, error } = await supabase
      .from('projects')
      .select('id, title, company, year, image_url, order_index')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('❌ Database error:', error);
      return;
    }

    console.log(`📊 Found ${projects.length} projects in database:\n`);
    
    projects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title}`);
      console.log(`   Company: ${project.company}`);
      console.log(`   Year: ${project.year}`);
      console.log(`   Image URL: ${project.image_url || 'NULL'}`);
      console.log(`   Order: ${project.order_index}`);
      console.log('   ---');
    });

    // Check for broken image URLs
    console.log('\n🔍 Analyzing image URLs...\n');
    
    const brokenImages = projects.filter(p => 
      p.image_url && 
      p.image_url.includes('/images/projects/') && 
      !p.image_url.includes('.png') && 
      !p.image_url.includes('.gif') && 
      !p.image_url.includes('.jpg') && 
      !p.image_url.includes('.jpeg')
    );

    const jpgImages = projects.filter(p => 
      p.image_url && p.image_url.includes('.jpg')
    );

    const pngImages = projects.filter(p => 
      p.image_url && p.image_url.includes('.png')
    );

    const gifImages = projects.filter(p => 
      p.image_url && p.image_url.includes('.gif')
    );

    const nullImages = projects.filter(p => !p.image_url);

    console.log(`📈 Image URL Analysis:`);
    console.log(`   - Projects with .jpg images: ${jpgImages.length}`);
    console.log(`   - Projects with .png images: ${pngImages.length}`);
    console.log(`   - Projects with .gif images: ${gifImages.length}`);
    console.log(`   - Projects with NULL images: ${nullImages.length}`);
    console.log(`   - Projects with broken/unknown extensions: ${brokenImages.length}`);

    if (jpgImages.length > 0) {
      console.log('\n📋 Projects with .jpg images:');
      jpgImages.forEach(p => console.log(`   - ${p.title}: ${p.image_url}`));
    }

    if (brokenImages.length > 0) {
      console.log('\n⚠️  Projects with potentially broken image URLs:');
      brokenImages.forEach(p => console.log(`   - ${p.title}: ${p.image_url}`));
    }

  } catch (err) {
    console.error('❌ Error:', err);
  }
}

checkDatabase();
