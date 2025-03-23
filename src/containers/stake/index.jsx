import { Fragment, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

// Icons
import LockIcon from '@mui/icons-material/Lock';
import TimerIcon from '@mui/icons-material/Timer';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TokenIcon from '@mui/icons-material/Token';

// Components
import TokenPools from '../../components/stake/TokenPools';
import StakeSteps from '../../components/stake/StakeSteps';
import HowToStake from '../../components/stake/HowToStake';

// Tab Panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`stake-tabpanel-${index}`}
      aria-labelledby={`stake-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Staking Pool Card component
const StakingPoolCard = ({ title, apr, lockPeriod, totalStaked, filled, isHot }) => {
  const [stakeAmount, setStakeAmount] = useState('');
  
  return (
    <Card 
      elevation={3}
      sx={{
        borderRadius: 4,
        overflow: 'visible',
        position: 'relative',
        backgroundColor: 'background.paper',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 12px 20px rgba(0, 0, 0, 0.15)'
        }
      }}
    >
      {isHot && (
        <Chip
          icon={<LocalFireDepartmentIcon />}
          label="HOT"
          color="error"
          size="small"
          sx={{ 
            position: 'absolute', 
            top: -10, 
            right: 16,
            fontWeight: 'bold'
          }}
        />
      )}
      
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 1, width: 32, height: 32 }}>
            <TokenIcon fontSize="small" />
          </Avatar>
          <Typography variant="h6" color="text.primary">
            {apr}% <Typography component="span" variant="body2" color="text.secondary">APR</Typography>
          </Typography>
        </Box>
        
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LockIcon sx={{ mr: 0.5, fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {lockPeriod > 0 ? `${lockPeriod} days lock` : 'No lock'}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccountBalanceWalletIcon sx={{ mr: 0.5, fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {totalStaked} staked
            </Typography>
          </Box>
        </Stack>
        
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" color="text.secondary">Pool filled</Typography>
            <Typography variant="body2" color="text.secondary">{filled}%</Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={filled} 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: filled < 50 ? 'success.main' : filled < 80 ? 'warning.main' : 'error.main'
              }
            }} 
          />
        </Box>
        
        <TextField
          fullWidth
          type="number"
          label="Amount to stake"
          variant="outlined"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          placeholder="0.00"
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: <InputAdornment position="end">$ELO</InputAdornment>,
          }}
        />
        
        <Box sx={{ bgcolor: 'background.default', p: 1.5, borderRadius: 2, mb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Potential earnings:</span>
            <span>{stakeAmount ? (parseFloat(stakeAmount) * apr / 100).toFixed(2) : '0.00'} $ELO</span>
          </Typography>
        </Box>
      </CardContent>
      
      <CardActions>
        <Button 
          fullWidth 
          variant="contained" 
          color="primary"
          size="large"
          sx={{ borderRadius: 2 }}
        >
          Stake Now
        </Button>
      </CardActions>
    </Card>
  );
};

// Stats Card component
const StatsCard = ({ icon, title, value, subtitle }) => (
  <Card sx={{ height: '100%', borderRadius: 4, bgcolor: 'background.paper' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 1.5 }}>
          {icon}
        </Avatar>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 0.5 }}>
        {value}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </CardContent>
  </Card>
);

export default function Stake() {
  const [tabValue, setTabValue] = useState(0);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  return (
    <Fragment>
      <Container>
        <Box sx={{ mb: 4 }}>
          <Typography
            color="text.primary"
            variant="h4"
            sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}
            component="div"
          >
            Staking
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Stake $ELO to earn more $ELO. You can stake $ELO tokens in the staking pools to earn
            high APR as a return for holding $ELO tokens.
          </Typography>
        </Box>
      </Container>
      
      <Box
        sx={{
          bgcolor: 'background.default',
          py: 7,
          borderTop: 1,
          borderBottom: 1,
          borderColor: 'divider',
          mb: 4,
        }}
      >
        <Container className="fadeInUp">
          {/* Stats Section */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard 
                icon={<TokenIcon />}
                title="Total Value Locked"
                value="$2,456,789"
                subtitle="Across all pools"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard 
                icon={<AccountBalanceWalletIcon />}
                title="Your Staked Balance"
                value="0 $ELO"
                subtitle="Across all pools"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard 
                icon={<LocalFireDepartmentIcon />}
                title="Highest APR"
                value="25%"
                subtitle="90-day lock pool"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard 
                icon={<TimerIcon />}
                title="Next Reward"
                value="12:34:56"
                subtitle="Time until distribution"
              />
            </Grid>
          </Grid>
          
          {/* Your Staking Section */}
          <Card sx={{ mb: 6, borderRadius: 4, overflow: 'hidden' }}>
            <Box sx={{ p: 3, bgcolor: 'primary.main' }}>
              <Typography variant="h5" component="div" sx={{ color: 'white', fontWeight: 'bold' }}>
                Your Staking Overview
              </Typography>
            </Box>
            <CardContent>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary" paragraph>
                  You don't have any active staking positions yet.
                </Typography>
                <Button 
                  variant="outlined" 
                  color="primary"
                  startIcon={<AccountBalanceWalletIcon />}
                >
                  Connect Wallet to Start Staking
                </Button>
              </Box>
            </CardContent>
          </Card>
          
          {/* Staking Pools Section */}
          <Typography
            variant="h5"
            component="div"
            color="text.primary"
            sx={{ fontWeight: 700, mb: 3 }}
          >
            Available Staking Pools
          </Typography>
          
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="staking pool tabs"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 'medium',
                  fontSize: '1rem',
                }
              }}
            >
              <Tab label="All Pools" />
              <Tab label="Flexible" />
              <Tab label="Locked" />
              <Tab label="High APR" />
            </Tabs>
          </Box>
          
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <StakingPoolCard 
                  title="Flexible Staking"
                  apr={5}
                  lockPeriod={0}
                  totalStaked="125,000 $ELO"
                  filled={35}
                  isHot={false}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <StakingPoolCard 
                  title="30-Day Lock"
                  apr={12}
                  lockPeriod={30}
                  totalStaked="350,000 $ELO"
                  filled={65}
                  isHot={true}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <StakingPoolCard 
                  title="90-Day Lock"
                  apr={25}
                  lockPeriod={90}
                  totalStaked="750,000 $ELO"
                  filled={85}
                  isHot={false}
                />
              </Grid>
            </Grid>
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <StakingPoolCard 
                  title="Flexible Staking"
                  apr={5}
                  lockPeriod={0}
                  totalStaked="125,000 $ELO"
                  filled={35}
                  isHot={false}
                />
              </Grid>
            </Grid>
          </TabPanel>
          
          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <StakingPoolCard 
                  title="30-Day Lock"
                  apr={12}
                  lockPeriod={30}
                  totalStaked="350,000 $ELO"
                  filled={65}
                  isHot={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <StakingPoolCard 
                  title="90-Day Lock"
                  apr={25}
                  lockPeriod={90}
                  totalStaked="750,000 $ELO"
                  filled={85}
                  isHot={false}
                />
              </Grid>
            </Grid>
          </TabPanel>
          
          <TabPanel value={tabValue} index={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <StakingPoolCard 
                  title="90-Day Lock"
                  apr={25}
                  lockPeriod={90}
                  totalStaked="750,000 $ELO"
                  filled={85}
                  isHot={false}
                />
              </Grid>
            </Grid>
          </TabPanel>
          
          {/* How to Stake Section */}
          <Box sx={{ mt: 6 }}>
            <Typography
              variant="h5"
              component="div"
              color="text.primary"
              sx={{ fontWeight: 700, mb: 3 }}
            >
              How to Stake $ELO
            </Typography>
            
            <Card sx={{ borderRadius: 4, bgcolor: 'background.paper' }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60, mx: 'auto', mb: 2 }}>1</Avatar>
                      <Typography variant="h6" gutterBottom>Connect Wallet</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Connect your wallet to access the staking platform and view your balance.
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60, mx: 'auto', mb: 2 }}>2</Avatar>
                      <Typography variant="h6" gutterBottom>Choose Pool & Amount</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Select a staking pool that matches your preferred lock period and enter the amount.
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60, mx: 'auto', mb: 2 }}>3</Avatar>
                      <Typography variant="h6" gutterBottom>Stake & Earn</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Confirm the transaction and start earning rewards based on the pool's APR.
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
          
          {/* FAQ Section */}
          <Box sx={{ mt: 6 }}>
            <Typography
              variant="h5"
              component="div"
              color="text.primary"
              sx={{ fontWeight: 700, mb: 3 }}
            >
              Frequently Asked Questions
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%', borderRadius: 4 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary.main">
                      What is staking?
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Staking is the process of locking up your $ELO tokens to support network operations and earn rewards. 
                      By staking, you're contributing to the security and efficiency of the platform.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%', borderRadius: 4 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary.main">
                      How are rewards calculated?
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Rewards are calculated based on the APR (Annual Percentage Rate), the amount staked, and the duration. 
                      The longer you stake and the more tokens you commit, the higher your rewards will be.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%', borderRadius: 4 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary.main">
                      Can I unstake early?
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Flexible staking allows immediate unstaking without penalties. Locked staking requires waiting until 
                      the lock period ends. Early unstaking from locked pools may result in penalties or forfeited rewards.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%', borderRadius: 4 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary.main">
                      When do I receive rewards?
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Rewards are distributed continuously and can be claimed at any time. The APR shown is the annualized 
                      rate, but rewards accrue on a block-by-block basis for maximum transparency.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
          
          {/* Risk Warning */}
          <Box sx={{ mt: 6, p: 3, bgcolor: 'warning.light', borderRadius: 4, display: 'flex', alignItems: 'center' }}>
            <InfoOutlinedIcon sx={{ mr: 2, color: 'warning.dark' }} />
            <Typography variant="body2" color="text.secondary">
              <strong>Risk Warning:</strong> Staking involves risks including potential loss of funds due to smart contract vulnerabilities. 
              APRs are estimates and may fluctuate based on market conditions and total staked amount. Please do your own research before staking.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Fragment>
  );
}
